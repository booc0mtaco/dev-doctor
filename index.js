#! /usr/bin/env node
const { version } = require("./package.json");

const { program } = require("commander");
const { lilconfig } = require("lilconfig");
const rules = require("./rules");

const RULE_TYPES = {
  EXIST: "exist",
  CMD: "cmd",
  VERSION: "version",
  NETWORK: "network",
  OS: "os",
};

// Learnings 1: JS modules are hard, yo...
// Learnings 2: Maybe checking network is a good new option?
(async function () {
  const ora = (await import("ora")).default;
  const chalk = (await import("chalk")).default;

  function printDiagnosis(results) {
    const failures = results.filter((result) => !result.pass).length;
    const total = results.length;
    const prefix = failures > 0 ? "❌ FAIL" : "✅ OK";

    console.log(`\n${prefix} (${total - failures}/${total} checks passed)\n`);

    return failures ? -1 : 0;
  }

  function getMeta(ruleType) {
    switch (ruleType) {
      case RULE_TYPES.CMD:
        return {
          description: `Check if command is installed and available`,
        };
      case RULE_TYPES.EXIST:
        return {
          description: `Check for important config files`,
        };
      case RULE_TYPES.VERSION:
        return {
          description: `Check the version of the installed executable`,
        };
      case RULE_TYPES.NETWORK:
        return {
          description: `Check the network ports`,
        };
      case RULE_TYPES.OS:
        return {
          description: `Check the Operating System configuration`,
        };
      default:
        return {};
    }
  }

  async function runDoctor() {
    const spinner = ora("Calling doctor").start();
    const results = [];
    const configResults = await lilconfig("dev-doctor", {
      ignoreEmptySearchPlaces: false,
    }).search();

    if (!configResults) {
      spinner.warn("Nothing to check for. Exiting. . .");
      return;
    }

    spinner.info(
      `${chalk.underline.bold("The doctor is in")}! Performing checkup. . .`
    );

    const configRules = (configResults && configResults.config) || [];

    // now check repo for each config item to see if it generates error
    for (var i = 0, len = configRules.length; i < len; i++) {
      const { type, ...opts } = configRules[i],
        rule = configRules[i];

      // Grab metadata for the standard rules
      const enhancedRule = Object.assign({}, rule, getMeta(type));

      if (rules[type]) {
        spinner.start(enhancedRule.description);
        try {
          const ruleResult = { ...rule, pass: await rules[type](opts) };
          if (ruleResult.pass) {
            spinner.succeed();
          } else {
            spinner.fail(`Failed: ${chalk.red.bold(rule.suggestion)}`);
          }
          results.push(ruleResult);
        } catch (e) {
          const ruleResult = { ...rule, pass: false };

          spinner.fail(`Failed: ${chalk.red.bold(rule.suggestion)}`);
          results.push(ruleResult);
        }
      }
    }
    printDiagnosis(results);
  }

  program.version(version).description("Diagnose your development environment");
  program.parse();

  // TODO: somehow triggering help terminates. We run doctor if we get here
  runDoctor(program.opts());
})();

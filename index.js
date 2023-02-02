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
          description: `Check if command executes properly`,
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
    const result = await lilconfig("dev-doctor", {
      ignoreEmptySearchPlaces: false,
    }).search();
    spinner.info("The doctor is in! Performing checkup. . .");

    // now check repo for each config item to see if it generates error
    result.config.forEach((rule) => {
      const { type, ...opts } = rule;

      // Grab metadata for the standard rules
      const enhancedRule = Object.assign({}, rule, getMeta(type));

      spinner.start(enhancedRule.description);

      if (rules[type]) {
        const ruleResult = { ...rule, pass: rules[type](opts) };
        results.push(ruleResult);
        spinner[ruleResult.pass ? "succeed" : "fail"]();
      }
    });
    /**
     * cmd
     *  - foo.sh failed
     *  - to fix: do bar
     */
    printDiagnosis(results);
  }

  program.version(version).description("Diagnose your development environment");
  program.parse();

  // TODO: somehow triggering help terminates. We run doctor if we get here
  runDoctor(program.opts());
})();

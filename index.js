#! /usr/bin/env node

const { program } = require("commander");
const { lilconfig } = require("lilconfig");
const rules = require("./rules");

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
      spinner.start(`run rule ${rule.type}`);
      // TODO: should do some pre-run checks to make sure a rule by this name exists first!
      if (rules[type]) {
        if (rules[type](opts)) {
          spinner.succeed(
            `rule passed: ${rule.type} with opts ${Object.entries(opts)}`
          );
          results.push({ ...rule, pass: true });
        } else {
          // TODO: suggest fix?
          spinner.fail(`rule failed: ${rule.type}`);
          results.push({ ...rule, pass: false });
        }
      }
    });
    /**
     * cmd
     *  - foo.sh failed
     *  - to fix: do bar
     */
    printDiagnosis(results);
  }

  program
    .version("0.0.1")
    .description("Diagnose your development environment")
    .action(() => {
      runDoctor();
    });

  program.parse();
})();

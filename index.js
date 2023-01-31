#! /usr/bin/env node

const { program } = require("commander");
const { lilconfig } = require("lilconfig");
const rules = require("./rules");

// Learnings 1: JS modules are hard, yo...
// Learnings 2: Maybe checking network is a good new option?
(async function () {
  const ora = (await import("ora")).default;

  const options = {
    ignoreEmptySearchPlaces: false,
  };
  const spinner = ora("Calling doctor").start();

  const runDoctor = function () {
    // read in the config
    lilconfig("dev-doctor", options)
      .search()
      .then((result) => {
        spinner.text = "got config!";

        // now check repo for each config item to see if it generates error
        result.config.forEach((rule) => {
          const { type, ...opts } = rule;
          spinner.start(`run rule ${rule.type}`);
          // TODO: should do some pre-run checks to make sure a rule by this name exists first!
          if (rules[type](opts)) {
            spinner.succeed(
              `rule passed: ${rule.type} with opts ${Object.entries(opts)}`
            );
          } else {
            // if true, spinner.succeed)
            // if false, fail with opts.errorMessage or default
            // TODO: suggest fix?
          }
        });
        /*
        
        option: instead of for loop, create promises for each rule, and (promise.all?)
        - one ora string for each rule?

        for each rule in the config:
          switch (rule) {
            case fileExists
              fileExists(glob); 
              break;
          }

        1. we loop through config and execute each rule
        2. each rule can fail, if that happens log some output
        3. show failure/success results + steps
        aka output one would expect from a test suite

        dev-doctor 2/3 success
        failures:
        * cmd - foo.sh failed 
            to fix: do bar
        */
      });
  };

  // allow the user to trigger the command
  program
    .version("0.0.1")
    .description("Diagnose your development environment")
    .action((str, options) => {
      spinner.text = "read config file and do doctor things";
      runDoctor();
    });

  program.parse();
})();

#! /usr/bin/env node
// Learnings 1: JS modules are hard, yo...
(async function () {
  const { program } = require("commander");
  const { lilconfig } = require("lilconfig");

  const ora = (await import("ora")).default;

  const options = {
    ignoreEmptySearchPlaces: false,
  };
  const spinner = ora("Calling doctor").start();

  const runDoctor = function () {
    // console.log("read in the config");
    spinner.text = "read in the config";

    lilconfig("dev-doctor", options)
      .search()
      .then((result) => {
        // console.log("got config", result.config);
        spinner.text = "got config!";
        // console.log(
        //   "now check repo for each config item to see if it generates error"
        // );
        spinner.text =
          "now check repo for each config item to see if it generates error";

        // TODO: replace this part with the code to check each of the configured checks
        // TODO: review where we upate the text for the doctor and async/await versus promises
        spinner.succeed();
      });
  };

  // allow the user to trigger the command
  program
    .version("0.0.1")
    .description("Diagnose your development environment")
    .action((str, options) => {
      // console.log("read config file and do doctor things", str);
      spinner.text = "read config file and do doctor things";
      runDoctor();
    });

  program.parse();
})();

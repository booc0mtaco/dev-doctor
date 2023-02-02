// TODO rule helper imports AND/OR imports from individual rule files
const exist = require("./exist/exist");

// 2. run as shell commands where:
// if pass (e.g., file exists), return boolean true
// if fail (e.g., file does not exist), return boolean false

module.exports = {
  exist,
  cmd: function (opts) {
    console.log("cmd function");
    return true;
  },
  version: function (opts) {
    console.log("version function");
    return true;
  },
  os: function (opts) {
    console.log("os function");
    return true;
  },
};

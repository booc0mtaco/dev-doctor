const {execSync} = require("child_process");

module.exports = function cmd({exec}) {
  try {
    execSync(`which ${exec}`);
  } catch (err) {
    return false;
  }

  return true;
};

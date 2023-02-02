const {execSync} = require("child_process");

module.exports = function cmd({exec}) {
  try {
    execSync(exec);
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
};

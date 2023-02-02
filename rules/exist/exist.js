const glob = require("glob");

module.exports = function exist({glob: globPattern}) {
  files = glob.sync(globPattern);

  if (files.length === 0) {
    return false;
  }

  return true;
};

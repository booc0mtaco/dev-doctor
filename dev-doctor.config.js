module.exports = [
  {
    type: "exist",
    glob: "./rules/**/*.spec.js",
  },
  {
    type: "cmd",
    exec: "npm",
    suggestion: "Make sure to install node locally: brew install node",
  },
];

module.exports = [
  {
    type: "exist",
    glob: "./rules/**/*.spec.js",
  },
  {
    type: "cmd",
    exec: "npm",
  },
  {
    type: "version",
    exec: "path/to/executable -v",
    range: "<1.0.0", // using semver range patterns
  },
];

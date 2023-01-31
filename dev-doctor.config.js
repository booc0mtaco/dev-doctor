module.exports = [
  // TODO: other useful metadata: (description, suggestion text, error message, etc.)
  {
    type: "exist",
    glob: "**/*/test.js",
  },
  {
    type: "cmd",
    exec: "path/to/executable",
  },
  {
    type: "version",
    exec: "path/to/executable -v",
    range: "<1.0.0", // using semver range patterns
  },
];

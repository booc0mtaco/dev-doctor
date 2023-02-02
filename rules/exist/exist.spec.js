const exist = require("./exist");

describe("when given an invalid glob", () => {
  it("errors", () => {
    const badGlob = [""];

    expect(() => exist({glob: badGlob})).toThrow();
  });
});

describe("given a glob to a file that exists", () => {
  it("returns true", () => {
    expect(exist({glob: "**/rules/**/exist.spec.js"})).toBe(true);
  });
});

describe("given a glob to a file that doesn't exist", () => {
  it("returns false", () => {
    expect(exist({glob: "**/rules/**/dne.js"})).toBe(false);
  });
});

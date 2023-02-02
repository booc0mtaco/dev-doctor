const cmd = require("./cmd");

describe("when provided command cannot be found", () => {
  it("returns false", () => {
    expect(cmd({exec: "foobar"})).toBe(false);
  });
});

describe("when provided can be found", () => {
  it("returns true", () => {
    expect(cmd({exec: "ls"})).toBe(true);
  });
});

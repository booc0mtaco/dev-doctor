const cmd = require("./cmd");

describe("when provided exec fails", () => {
  it("returns false", () => {
    expect(cmd({exec: "foobar"})).toBe(false);
  });
});

describe("when provided exec fails", () => {
  it("returns true", () => {
    expect(cmd({exec: "ls"})).toBe(true);
  });
});

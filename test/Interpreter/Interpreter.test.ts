import Quara from "../../src/index";

describe("Interpreter", () => {
  it("Should throw a syntax error", () => {
    const quara = new Quara("1 + 2 +");
    try {
      expect(quara.run()).toThrow();
    }
    catch (e) {}
  });
});

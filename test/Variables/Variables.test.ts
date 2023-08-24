import Quara from "../../src";
import VariableDeclarationTests from "../Variables/VariableDeclarationTests";
import VariableAccessTests from "./VariableAccessTests";
import VariableAssignTests from "./VariableAssignTests";

describe("Variables", () => {
  describe("Variable declaration", VariableDeclarationTests.test);
  describe("Variable assign", VariableAssignTests.test);
  describe("Variable access", VariableAccessTests.test);

  it("should throw an error when access an non declared variable", () => {
    try {
      const quara = new Quara("num;");
      expect(quara.run()).toThrow();
    }
    catch (e) {}
  });

  it("should throw an error when asign a value to a non declared variable", () => {
    try {
      const quara = new Quara("num = 1;");
      expect(quara.run()).toThrow();
    }
    catch (e) {}
  });
});

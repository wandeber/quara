import Quara from "../../src/Quara";
import VariableDeclarationTests from "../Variables/VariableDeclarationTests";
import ObjectDeclarationTests from "./ObjectDeclarationTests";
import VariableAccessTests from "./VariableAccessTests";
import VariableAssignTests from "./VariableAssignTests";

describe("Variables", () => {
  describe("Variable declaration", VariableDeclarationTests.test);
  describe("Object declaration", ObjectDeclarationTests.test);
  describe("Variable assign", VariableAssignTests.test);
  describe("Variable access", VariableAccessTests.test);

  it("should throw an error when access an non declared variable", () => {
    try {
      expect(Quara.scriptSync("num;")).toThrow();
    }
    catch (e) {}
  });

  it("should throw an error when assign a value to a non declared variable", () => {
    try {
      expect(Quara.scriptSync("num = 1;")).toThrow();
    }
    catch (e) {}
  });

  it("should throw an error when redeclare a variable", () => {
    try {
      expect(Quara.scriptSync("var num = 1; var num = 2; num")).toThrow();
    }
    catch (e) {}
  });

  it("should throw an error when redeclare a constant", () => {
    try {
      expect(Quara.scriptSync("const num = 1; const num = 2; num")).toThrow();
    }
    catch (e) {}
  });

  it("should throw an error when declare a constant without value", () => {
    try {
      expect(Quara.scriptSync("const num1; num1")).toThrow();
      expect(Quara.scriptSync("const num1, num2; num1")).toThrow();
      expect(Quara.scriptSync("const num1 = 1, num2; num1")).toThrow();
      expect(Quara.scriptSync("const num1, num2 = 2; num1")).toThrow();
    }
    catch (e) {}
  });
});

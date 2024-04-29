import {Quara} from "../../src/Quara";
import {VariableDeclarationTests} from "../Variables/VariableDeclarationTests";
import {ObjectTests} from "./ObjectTests";
import {ArrayTests} from "./ArrayTests";
import {VariableAccessTests} from "./VariableAccessTests";
import {VariableAssignTests} from "./VariableAssignTests";
import {ConstantsTests} from "./ConstantsTests";

describe("Variables", () => {
  describe("Variable declaration", VariableDeclarationTests.test);
  describe("Objects", ObjectTests.test);
  describe("Arrays", ArrayTests.test);
  describe("Variable assign", VariableAssignTests.test);
  describe("Variable access", VariableAccessTests.test);
  describe("Constant declarations", ConstantsTests.test);

  // it("should throw an error when access an non declared variable", () => {
  //   expect(() => Quara.scriptSync("num;")).toThrow();
  // });

  // it("should throw an error when assign a value to a non declared variable", () => {
  //   expect(() => Quara.scriptSync("num = 1;")).toThrow();
  // });

  it("should throw an error when redeclare a variable", () => {
    expect(() => Quara.scriptSync("var num = 1; var num = 2; num")).toThrow();
  });

  it("should throw an error when redeclare a constant", () => {
    expect(() => Quara.scriptSync("const num = 1; const num = 2; num")).toThrow();
  });

  it("should throw an error when declare a constant without value", () => {
    expect(() => Quara.scriptSync("const num1; num1")).toThrow();
    expect(() => Quara.scriptSync("const num1, num2; num1")).toThrow();
    expect(() => Quara.scriptSync("const num1 = 1, num2; num1")).toThrow();
    expect(() => Quara.scriptSync("const num1, num2 = 2; num1")).toThrow();
  });
});

import {expect, describe, it} from "bun:test";
import AndTests from "./LogicOperators/AndTests";
import DivisionTests from "./ArithmeticOperators/BinaryOperators/DivisionTests";
import EqualityTests from "./LogicOperators/EqualityTests";
import ExponentiationTests from "./ArithmeticOperators/BinaryOperators/ExponentiationTests";
import GreaterThanEqualTests from "./LogicOperators/GreaterThanEqualTests";
import GreaterThanTests from "./LogicOperators/GreaterThanTests";
import InequalityTests from "./LogicOperators/InequalityTests";
import LaxEqualityTests from "./LogicOperators/LaxEqualityTests";
import LaxInequalityTests from "./LogicOperators/LaxInequalityTests";
import LessThanEqualTests from "./LogicOperators/LessThanEqualTests";
import LessThanTests from "./LogicOperators/LessThanTests";
import MinusTests from "./ArithmeticOperators/UnaryOperators/MinusTests";
import ModulusTests from "./ArithmeticOperators/BinaryOperators/ModulusTests";
import MultiplicationTests from "./ArithmeticOperators/BinaryOperators/MultiplicationTests";
import NotTests from "./LogicOperators/NotTests";
import OrTests from "./LogicOperators/OrTests";
import PlusTests from "./ArithmeticOperators/UnaryOperators/PlusTests";
import SquareRootTests from "./ArithmeticOperators/UnaryOperators/SquareRootTests";
import SubstractionTests from "./ArithmeticOperators/BinaryOperators/SubstractionTests";
import SumTests from "./ArithmeticOperators/BinaryOperators/SumTests";
import FunctionCallsTests from "./FunctionCalls/FunctionCallsTests";
import ParenthesisTests from "./ParenthesisTests";
import PreIncrementTests from "./ArithmeticOperators/UnaryOperators/PreIncrementTests";
import PreDecrementTests from "./ArithmeticOperators/UnaryOperators/PreDecrementTests";
import CommentsTests from "./CommentsTests";
import Quara from "../src/Quara";
import IfTests from "./FlowControl/IfTests";
import WhileTests from "./FlowControl/WhileTests";
import TextProcessorTests from "./TextProcessor/TextProcessorTests";





describe("Arithmetic operators", () => {
  describe("Binary operators", () => {
    describe("Sum (+)", SumTests.test);
    describe("Substraction (-)", SubstractionTests.test);
    describe("Multiplication (*)", MultiplicationTests.test);
    describe("Division (/)", DivisionTests.test);
    describe("Modulus (%)", ModulusTests.test);
    describe("Exponentietion 1 (^ and **)", ExponentiationTests.test);
  });
  describe("Unary operators", () => {
    describe("Plus (+ ...)", PlusTests.test);
    describe("Minus (- ...)", MinusTests.test);
    describe("Square root (¬/ ...)", SquareRootTests.test);
    describe("Pre-increment (++ ...)", PreIncrementTests.test);
    describe("Pre-decrement (-- ...)", PreDecrementTests.test);
  });
});

describe("Logic operators", () => {
  describe("Not (!, $not)", NotTests.test);
  describe("Equality (==, $eq)", EqualityTests.test);
  describe("Inequality (!=, $ne)", InequalityTests.test);
  describe("Lax equality (~=, $leq)", LaxEqualityTests.test);
  describe("Lax inequality (!~=, $lne)", LaxInequalityTests.test);
  describe("Less than (<, $lt)", LessThanTests.test);
  describe("Greater than (>, $gt)", GreaterThanTests.test);
  describe("Less than or equal (<=, $lte)", LessThanEqualTests.test);
  describe("Greater than or equal (>=, $gte)", GreaterThanEqualTests.test);
  describe("And (&&, $and)", AndTests.test);
  describe("Or (||, $or)", OrTests.test);
});

describe("Function calls", FunctionCallsTests.test);
describe("Parenthesis", ParenthesisTests.test);
describe("Comments", CommentsTests.test);
describe("If", IfTests.test);
describe("While", WhileTests.test);

describe("TextProcessor", TextProcessorTests.test);

describe("Multiine scripts", () => {
  it("should process multiline scripts", () => {
    expect(Quara.scriptSync(`
      var num1 = 1;\n\r

      var num2 = 2;\n
      var num3 = 3;\r

      num1 + num2 + num3;
    `)).toBe(6);
  });
  it("should support tabs", async () => {
    expect(await Quara.script("var num1 = 1;\t\tvar num2 = 2;num1 + num2")).toBe(3);
  });
  it("should skip unnecessary spaces", () => {
    expect(Quara.scriptSync("var num1 = 1;   var num2 = 2;num1 + num2")).toBe(3);
  });
});

describe("Quara strings", () => {
  it("should process multiline string", () => {
    expect(Quara.textSync(
      "El resultado es:\n"
      +"{var num1 = 1}\n\r"
      +"{"
      +"  var num2 = 2;\n"
      +"  var num3 = 3;\r"
      +"}\n"
      +"{num1 + num2 + num3}",
    )).toBe("El resultado es:\n\n\r\n6");
  });
  it("should support tabs", async () => {
    expect(await Quara.script("var num1 = 1;\t\tvar num2 = 2;num1 + num2")).toBe(3);
  });
  it("should skip unnecessary spaces", () => {
    expect(Quara.scriptSync("var num1 = 1;   var num2 = 2;num1 + num2")).toBe(3);
  });
});


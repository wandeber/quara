import {AndTests} from "./LogicOperators/AndTests";
import {DivTests} from "./ArithmeticOperators/BinOperators/DivTests";
import {EqualityTests} from "./LogicOperators/EqualityTests";
import {ExponentiationTests} from "./ArithmeticOperators/BinOperators/ExponentiationTests";
import {GreaterThanEqualTests} from "./LogicOperators/GreaterThanEqualTests";
import {GreaterThanTests} from "./LogicOperators/GreaterThanTests";
import {InequalityTests} from "./LogicOperators/InequalityTests";
import {LaxEqualityTests} from "./LogicOperators/LaxEqualityTests";
import {LaxInequalityTests} from "./LogicOperators/LaxInequalityTests";
import {LessThanEqualTests} from "./LogicOperators/LessThanEqualTests";
import {LessThanTests} from "./LogicOperators/LessThanTests";
import {MinusTests} from "./ArithmeticOperators/UnaryOperators/MinusTests";
import {ModTests} from "./ArithmeticOperators/BinOperators/ModTests";
import {MultiplicationTests} from "./ArithmeticOperators/BinOperators/MultiplicationTests";
import {NotTests} from "./LogicOperators/NotTests";
import {OrTests} from "./LogicOperators/OrTests";
import {PlusTests} from "./ArithmeticOperators/UnaryOperators/PlusTests";
import {SqrtTests} from "./ArithmeticOperators/UnaryOperators/SqrtTests";
import {SubstractionTests} from "./ArithmeticOperators/BinOperators/SubstractionTests";
import {SumTests} from "./ArithmeticOperators/BinOperators/SumTests";
import {FunctionCallsTests} from "./FunctionCalls/FunctionCallsTests";
import {ParenthesisTests} from "./ParenthesisTests";
import {PreIncrementTests} from "./ArithmeticOperators/UnaryOperators/PreIncrementTests";
import {PreDecrementTests} from "./ArithmeticOperators/UnaryOperators/PreDecrementTests";
import {CommentsTests} from "./CommentsTests";
import {Quara} from "../src/Quara";
import {IfTests} from "./FlowControl/IfTests";
import {WhileTests} from "./FlowControl/WhileTests";
import {TextProcessorTests} from "./TextProcessor/TextProcessorTests";





describe("Arithmetic operators", () => {
  describe("Binary operators", () => {
    describe("Sum (+)", SumTests.test);
    describe("Substraction (-)", SubstractionTests.test);
    describe("Multiplication (*)", MultiplicationTests.test);
    describe("Division (/)", DivTests.test);
    describe("Modulus (%)", ModTests.test);
    describe("Exponentietion 1 (^ and **)", ExponentiationTests.test);
  });
  describe("Unary operators", () => {
    describe("Plus (+ ...)", PlusTests.test);
    describe("Minus (- ...)", MinusTests.test);
    describe("Square root (¬/ ...)", SqrtTests.test);
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

describe("Quara class", () => {
  it("should create a new instance with global variables", () => {
    const quara = new Quara("var1 + 5", {var1: 10});
    expect(quara.run()).toBe(15);
  });

  it("should create a new instance without global variables", () => {
    const quara = new Quara("var1");
    expect(quara.run()).toBe(undefined);
  });

  it("should work with text static method", async () => {
    expect(await Quara.text("{var num1 = 1; var num2 = 2; num1 + num2}")).toBe("3");
  });

  it("should work with file static method and a script", async () => {
    expect(await Quara.file("./test/test1.quara")).toBe(3);
  });

  it("should work with file static method and qtml format", async () => {
    expect(await Quara.file("./test/test2.qtml")).toBe("3");
  });

  it("should throw an error with file static method and unsupported extension", async () => {
    try {
      await Quara.file("./test/test3.txt");
    }
    catch (error) {
      expect(error.message).toBe("File extension not supported.");
    }
  });
});


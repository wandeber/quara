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
import Quara from "../src";
import SquareRootTests from "./ArithmeticOperators/UnaryOperators/SquareRootTests";
import SubstractionTests from "./ArithmeticOperators/BinaryOperators/SubstractionTests";
import SumTests from "./ArithmeticOperators/BinaryOperators/SumTests";





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
    //describe("Pre-increment (++ ...)", PreIncrementTests.test);
    //describe("Pre-decrement (++ ...)", PreDecrementTests.test);
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

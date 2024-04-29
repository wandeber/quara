import {DivTests} from "./BinOperators/DivTests";
import {ExponentiationTests} from "./BinOperators/ExponentiationTests";
import {MinusTests} from "./UnaryOperators/MinusTests";
import {ModTests} from "./BinOperators/ModTests";
import {MultiplicationTests} from "./BinOperators/MultiplicationTests";
import {PlusTests} from "./UnaryOperators/PlusTests";
import {SqrtTests} from "./UnaryOperators/SqrtTests";
import {SubstractionTests} from "./BinOperators/SubstractionTests";
import {SumTests} from "./BinOperators/SumTests";
import {PreIncrementTests} from "./UnaryOperators/PreIncrementTests";
import {PreDecrementTests} from "./UnaryOperators/PreDecrementTests";
import {ParenthesisTests} from "./ParenthesisTests";


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

  describe("Parenthesis", ParenthesisTests.test);
});

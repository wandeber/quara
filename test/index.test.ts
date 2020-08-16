import DivisionTests from "./ArithmeticOperators/BinaryOperators/DivisionTests";
import ExponentiationTests from "./ArithmeticOperators/BinaryOperators/ExponentiationTests";
import MinusTests from "./ArithmeticOperators/UnaryOperators/MinusTests";
import ModulusTests from "./ArithmeticOperators/BinaryOperators/ModulusTests";
import MultiplicationTests from "./ArithmeticOperators/BinaryOperators/MultiplicationTests";
import PlusTests from "./ArithmeticOperators/UnaryOperators/PlusTests";
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
    //describe("Square root (¬/ ...)", SquareRootTests.test);
    //describe("Pre-increment (++ ...)", PreIncrementTests.test);
    //describe("Pre-decrement (++ ...)", PreDecrementTests.test);
  });

  //describe("Logic operators", () => {
  /*
  describe("Not (!)", SumTests.test);
  describe("Not ($not)", SumTests.test);

  describe("Equality (==)", SumTests.test);
  describe("Equality ($eq)", SumTests.test);
  
  describe("Inequality (!=)", SubstractionTests.test);
  describe("Inequality ($ne)", SubstractionTests.test);
  
  describe("Lax equality (~=)", MultiplicationTests.test);
  describe("Lax equality ($leq)", MultiplicationTests.test);

  describe("Lax inequality (!~=)", DivisionTests.test);
  describe("Lax inequality ($lne)", MultiplicationTests.test);

  describe("Less than (<)", ExponentiationTests.test1);
  describe("Less than ($lt)", ExponentiationTests.test1);

  describe("Greater than (>)", ExponentiationTests.test2);
  describe("Greater than ($gt)", ExponentiationTests.test2);

  describe("Less than or equal (<=)", ExponentiationTests.test1);
  describe("Less than or equal ($lte)", ExponentiationTests.test1);

  describe("Greater than or equal (>=)", ExponentiationTests.test2);
  describe("Greater than or equal ($gte)", ExponentiationTests.test2);
  */
  //});
});

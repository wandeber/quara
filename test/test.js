"use strict";

//const assert = require("assert");
const {ExponentiationTests} = require("./BinaryOperators/ArithmeticOperators/ExponentiationTests");
const {SumTests} = require("./BinaryOperators/ArithmeticOperators/SumTests");
const {SubstractionTests} = require("./BinaryOperators/ArithmeticOperators/SubstractionTests");
const {MultiplicationTests} = require("./BinaryOperators/ArithmeticOperators/MultiplicationTests");
const {DivisionTests} = require("./BinaryOperators/ArithmeticOperators/DivisionTests");





describe("Binary operators", () => {
  describe("Arithmetic operators", () => {
    describe("Sum operator (+)", SumTests.test);
    describe("Substract operator (-)", SubstractionTests.test);
    describe("Multiplication operator (*)", MultiplicationTests.test);
    describe("Multiplication operator (/)", DivisionTests.test);
    describe("Exponentietion operator 1 (^)", ExponentiationTests.test1);
    describe("Exponentietion operator 2 (**)", ExponentiationTests.test2);
  });
});

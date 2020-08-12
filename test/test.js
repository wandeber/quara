"use strict";

const assert = require("assert");
const {Quara} = require("../src/index.js");





describe("Arithmetic operators", () => {
  describe("Integer sum (a + b)", () => {
    let num1 = 1;
    let num2 = 3;
    let expectedResult = 4;
    let expression;

    expression = `${num1} + ${num2}`;
    it(`should return ${expectedResult} when it sums ${num1} and ${num2}`, () => {
      const quara = new Quara(expression);
      assert.equal(quara.run(), expectedResult);
    });

    expression = `${num1}+${num2}`;
    it(`should return ${expectedResult} when it sums ${num1} and ${num2} without spaces`, () => {
      const quara = new Quara(expression);
      assert.equal(quara.run(), expectedResult);
    });

    expression = `  ${num1}  +  ${num2}  `;
    it(`should return ${expectedResult} when it sums ${num1} and ${num2} with extra spaces`, () => {
      const quara = new Quara(expression);
      assert.equal(quara.run(), expectedResult);
    });
  });
});

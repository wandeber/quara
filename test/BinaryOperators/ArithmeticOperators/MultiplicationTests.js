"use strict";

const {TestHelper} = require("../../TestHelper");





class MultiplicationTests {
  static test() {
    // Enteros
    let num1 = 6;
    let num2 = 3;
    let num3 = 5;
    
    const tests = [
      {
        result: num1 * num2,
        expressions: [
          `${num1} * ${num2}`,
          `${num1}*${num2}`,
          `   ${num1}   *   ${num2}   `
        ]
      },
      {
        result: num1 * num2 * num3,
        expressions: [
          `${num1} * ${num2} * ${num3}`,
          `${num1} * ${num2} * ${num3};`,
          `${num1} * ${num2} * ${num3}  ;  `,
          `${num1} * ${num2} * ${num3}  ;;  `
        ]
      },
      {
        result: 0 * num2,
        expressions: [
          `0 * ${num2}`
        ]
      },
      {
        result: num2 * 0,
        expressions: [
          `${num2} * 0`
        ]
      }
    ];
  
    TestHelper.runTests(tests);
  }
}



module.exports = {MultiplicationTests};

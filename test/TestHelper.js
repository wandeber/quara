"use strict";

const assert = require("assert");
const {Quara} = require("../src/index.js");





class TestHelper {
  static runTests(tests) {
    for (const test of tests) {
      for (const expression of test.expressions) {
        it(`Should return ${test.result} when it executes: '${expression}'`, () => {
          const quara = new Quara(expression);
          assert.equal(quara.run(), test.result);
        });
      }
    }
  }
}



module.exports = {TestHelper};

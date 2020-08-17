

//const assert = require("assert");
import Quara from "../src/index";
import TestConfiguration from "./TestConfiguration";





export default class TestHelper {
  static test(expression: string, expectedResult: any) {
    it(`Should return ${expectedResult} when it executes: '${expression}'`, () => {
      const quara = new Quara(expression);
      expect(quara.run()).toBe(expectedResult);
    });
  }

  static runTests(tests: TestConfiguration[]) {
    for (const test of tests) {
      if (Array.isArray(test.expression)) {
        for (const expr of test.expression) {
          TestHelper.test(expr, test.result);
        }
      }
      else {
        TestHelper.test(test.expression, test.result);
      }
    }
  }
}
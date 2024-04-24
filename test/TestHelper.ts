// const assert = require("assert");
import Quara from "../src/Quara";
import TestConfiguration from "./TestConfiguration";





export default class TestHelper {
  static test(expression: string, expectedResult: any, variables: object = {}, shouldThrow = false) {
    it(`Should return ${expectedResult} when it executes: '${expression}'`, () => {
      if (shouldThrow) {
        expect(() => Quara.scriptSync(expression, variables)).toThrow();
      }
      else {
        expect(Quara.scriptSync(expression, variables)).toEqual(expectedResult);
      }
    });
  }

  static runTests(tests: TestConfiguration[]) {
    for (const test of tests) {
      if (Array.isArray(test.expression)) {
        for (const expr of test.expression) {
          TestHelper.test(expr, test.result, test.variables, test.shouldThrow);
        }
      }
      else {
        TestHelper.test(test.expression, test.result, test.variables, test.shouldThrow);
      }
    }
  }
}

import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";



export class TypesFunctionsTests {
  static test() {
    const tests: TestConfiguration[] = [
      // isNumber
      new TestConfiguration("isNumber(4)", true),
      new TestConfiguration("isNumber(4.5)", true),
      new TestConfiguration("isNumber(-4)", true),
      new TestConfiguration("isNumber(-4.5)", true),
      new TestConfiguration("isNumber(0)", true),
      new TestConfiguration("isNumber(-0)", true),
      new TestConfiguration('isNumber("test")', false),
      new TestConfiguration("isNumber(true)", false),
      new TestConfiguration("isNumber(false)", false),
      new TestConfiguration("isNumber([])", false),
      new TestConfiguration("isNumber({})", false),

      // isInteger
      new TestConfiguration("isInteger(4)", true),
      new TestConfiguration("isInteger(4.5)", false),
      new TestConfiguration("isInteger(-4)", true),
      new TestConfiguration("isInteger(-4.5)", false),
      new TestConfiguration("isInteger(0)", true),
      new TestConfiguration("isInteger(-0)", true),

      // isDecimal
      new TestConfiguration("isDecimal(4)", false),
      new TestConfiguration("isDecimal(4.5)", true),
      new TestConfiguration("isDecimal(-4)", false),
      new TestConfiguration("isDecimal(-4.5)", true),
      new TestConfiguration("isDecimal(0)", false),
      new TestConfiguration("isDecimal(-0)", false),

      // isString
      new TestConfiguration('isString("test")', true),
      new TestConfiguration('isString("")', true),
      new TestConfiguration("isString(4)", false),

      // isBoolean
      new TestConfiguration("isBoolean(true)", true),
      new TestConfiguration("isBoolean(false)", true),
      new TestConfiguration("isBoolean(0)", false),
      new TestConfiguration("isBoolean(1)", false),
      new TestConfiguration("isBoolean(asd)", false),

      // isArray
      new TestConfiguration("isArray([])", true),
      new TestConfiguration("isArray([1, 2, 3])", true),
      new TestConfiguration("isArray(4)", false),
      new TestConfiguration("isArray({})", false),
      new TestConfiguration("isArray({prop: 1})", false),

      // isObject
      new TestConfiguration("isObject({})", true),
      new TestConfiguration("isObject({prop: 1})", true),
      new TestConfiguration("isObject([])", false), // ?
      new TestConfiguration("isObject([1, 2, 3])", false), // ?
      new TestConfiguration("isObject(4)", false),
      new TestConfiguration("isObject(asd)", false),
    ];

    TestHelper.runTests(tests);
  }
}

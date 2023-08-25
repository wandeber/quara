import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class FunctionCallsTests {
  static test() {
    let num1 = 14;
    let dec1 = 14.14;

    let strLower = "un string";
    let strUpper = "UN STRING";

    const tests: TestConfiguration[] = [
      new TestConfiguration(`fixed(${num1}, 2)`, num1.toFixed(2)),
      new TestConfiguration(`fixed(${dec1}, 2)`, dec1.toFixed(2)),
      new TestConfiguration(`fixed(${num1}, 0)`, num1.toFixed(0)),
      new TestConfiguration(`fixed(${dec1}, 0)`, dec1.toFixed(0)),

      new TestConfiguration(`upperCase("${strLower}")`, strUpper),
      new TestConfiguration(`upperCase("${strUpper}")`, strUpper),

      new TestConfiguration(`lowerCase("${strLower}")`, strLower),
      new TestConfiguration(`lowerCase("${strUpper}")`, strLower),

      new TestConfiguration(`isNaN(${num1})`, Number.isNaN(num1)),
      new TestConfiguration(`isNaN("${strLower}")`, Number.isNaN(strLower)),

      new TestConfiguration('contains(sampleSimpleArray, "value 1")', true),
      new TestConfiguration('contains(sampleSimpleArray, "value asdasd")', false),
      new TestConfiguration('contains("hello world", "world")', true),
      new TestConfiguration('contains("hello world", "mundo")', false),
    ];

    TestHelper.runTests(tests);
  }
}



import TestConfiguration from "../../TestConfiguration";
import TestHelper from "../../TestHelper";




export default class MinusTests {
  static test() {
    let num1 = 6;
    let num2 = -3;

    const tests: TestConfiguration[] = [
      new TestConfiguration([`- ${num1}`, `-${num1}`], -num1),
      new TestConfiguration(`- - ${num1}`, num1),
      new TestConfiguration([`- - - ${num1}`, `- - -${num1}`], -num1),
      new TestConfiguration(`- ${num2}`, -num2),
      new TestConfiguration(`- - ${num2}`, num2),
      new TestConfiguration(`- - - ${num2}`, -num2),
      new TestConfiguration(["- 0", "- - 0"], 0),
    ];

    TestHelper.runTests(tests);
  }
}

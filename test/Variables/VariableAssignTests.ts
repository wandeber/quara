import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class VariableAssignTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var num1 = 1, num2 = 2; num1 = num2 = 4; num1 + num2", 8),
      new TestConfiguration("var num1 = 1; num1 += 3", 4),
      new TestConfiguration("var num1 = 18; num1 -= 4", 14),
      new TestConfiguration("var num1 = 7; num1 *= 2", 14),
      new TestConfiguration("var num1 = 28; num1 /= 2", 14),
      new TestConfiguration("var num1 = 3; num1 ^= 2", 9),
      new TestConfiguration("var num1 = 14; num1 %= 3", 2),
    ];

    TestHelper.runTests(tests);
  }
}

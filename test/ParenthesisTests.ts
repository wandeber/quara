import TestConfiguration from "./TestConfiguration";
import TestHelper from "./TestHelper";





export default class ParenthesisTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("2 * (3 + 3)", 12),
      new TestConfiguration("2 * (12 / (4 - 2));", 12),
    ];

    TestHelper.runTests(tests);
  }
}

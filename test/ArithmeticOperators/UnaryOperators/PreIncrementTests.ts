

import TestConfiguration from "../../TestConfiguration";
import TestHelper from "../../TestHelper";




export default class PreIncrementTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var num = 5; ++num;", 6),
    ];

    TestHelper.runTests(tests);
  }
}

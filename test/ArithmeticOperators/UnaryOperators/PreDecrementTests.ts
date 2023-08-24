

import TestConfiguration from "../../TestConfiguration";
import TestHelper from "../../TestHelper";




export default class PreDecrementTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var num = 5; --num;", 4),
    ];

    TestHelper.runTests(tests);
  }
}

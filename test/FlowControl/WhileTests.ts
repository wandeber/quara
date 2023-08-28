import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class IfTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var i = 0; while (i < 5) {i = i + 1;} 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) {i = i + 1} 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) i = i + 1; 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) ++i; 9 + i", 14),
    ];

    TestHelper.runTests(tests);
  }
}

import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class TextProcessorTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("`14`", "14"),
    ];

    TestHelper.runTests(tests);
  }
}

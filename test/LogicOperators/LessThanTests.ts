import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class LessThanTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("5 < 5", false),
      new TestConfiguration("5 < 6", true),
      new TestConfiguration("6 < 5", false),
      new TestConfiguration("5.2 < 5.2", false),
      new TestConfiguration("5.2 < 5.3", true),
      new TestConfiguration("5.3 < 5.2", false),
      new TestConfiguration("true < true", false),
      new TestConfiguration("true < false", false),
      new TestConfiguration("false < true", true),
      new TestConfiguration("\"asd\" < \"asd\"", false),
      new TestConfiguration("\"asdf\" < \"asd\"", false),
      new TestConfiguration("\"asd\" < \"asdf\"", true),

      new TestConfiguration("5 $lt 5", false),
      new TestConfiguration("5 $lt 6", true),
      new TestConfiguration("6 $lt 5", false),
      new TestConfiguration("5.2 $lt 5.2", false),
      new TestConfiguration("5.2 $lt 5.3", true),
      new TestConfiguration("5.3 $lt 5.2", false),
      new TestConfiguration("true $lt true", false),
      new TestConfiguration("true $lt false", false),
      new TestConfiguration("false $lt true", true),
      new TestConfiguration("\"asd\" $lt \"asd\"", false),
      new TestConfiguration("\"asdf\" $lt \"asd\"", false),
      new TestConfiguration("\"asd\" $lt \"asdf\"", true),
    ];

    TestHelper.runTests(tests);
  }
}

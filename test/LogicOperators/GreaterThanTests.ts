import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class GreaterThanTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("5 > 5", false),
      new TestConfiguration("5 > 6", false),
      new TestConfiguration("6 > 5", true),
      new TestConfiguration("5.2 > 5.2", false),
      new TestConfiguration("5.2 > 5.3", false),
      new TestConfiguration("5.3 > 5.2", true),
      new TestConfiguration("true > true", false),
      new TestConfiguration("true > false", true),
      new TestConfiguration("false > true", false),
      new TestConfiguration("\"asd\" > \"asd\"", false),
      new TestConfiguration("\"asdf\" > \"asd\"", true),
      new TestConfiguration("\"asd\" > \"asdf\"", false),

      new TestConfiguration("5 $gt 5", false),
      new TestConfiguration("5 $gt 6", false),
      new TestConfiguration("6 $gt 5", true),
      new TestConfiguration("5.2 $gt 5.2", false),
      new TestConfiguration("5.2 $gt 5.3", false),
      new TestConfiguration("5.3 $gt 5.2", true),
      new TestConfiguration("true $gt true", false),
      new TestConfiguration("true $gt false", true),
      new TestConfiguration("false $gt true", false),
      new TestConfiguration("\"asd\" $gt \"asd\"", false),
      new TestConfiguration("\"asdf\" $gt \"asd\"", true),
      new TestConfiguration("\"asd\" $gt \"asdf\"", false),
    ];

    TestHelper.runTests(tests);
  }
}

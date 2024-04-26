import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class GreaterThanEqualTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("5 >= 5", true),
      new TestConfiguration("5 >= 6", false),
      new TestConfiguration("6 >= 5", true),
      new TestConfiguration("5.2 >= 5.2", true),
      new TestConfiguration("5.2 >= 5.3", false),
      new TestConfiguration("5.3 >= 5.2", true),
      new TestConfiguration("true >= true", true),
      new TestConfiguration("true >= false", true),
      new TestConfiguration("false >= true", false),
      new TestConfiguration("\"asd\" >= \"asd\"", true),
      new TestConfiguration("\"asdf\" >= \"asd\"", true),
      new TestConfiguration("\"asd\" >= \"asdf\"", false),

      new TestConfiguration("5 $gte 5", true),
      new TestConfiguration("5 $gte 6", false),
      new TestConfiguration("6 $gte 5", true),
      new TestConfiguration("5.2 $gte 5.2", true),
      new TestConfiguration("5.2 $gte 5.3", false),
      new TestConfiguration("5.3 $gte 5.2", true),
      new TestConfiguration("true $gte true", true),
      new TestConfiguration("true $gte false", true),
      new TestConfiguration("false $gte true", false),
      new TestConfiguration("\"asd\" $gte \"asd\"", true),
      new TestConfiguration("\"asdf\" $gte \"asd\"", true),
      new TestConfiguration("\"asd\" $gte \"asdf\"", false),
    ];

    TestHelper.runTests(tests);
  }
}

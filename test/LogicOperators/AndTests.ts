import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class AndTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("true && true", true),
      new TestConfiguration("false && true", false),

      new TestConfiguration("1 && true", true),
      new TestConfiguration("-1 && true", true),
      new TestConfiguration("0 && true", 0),

      new TestConfiguration("\"1\" && true", true),
      new TestConfiguration("\"0\" && true", true),

      new TestConfiguration("true $and true", true),
      new TestConfiguration("false $and true", false),

      new TestConfiguration("1 $and true", true),
      new TestConfiguration("-1 $and true", true),
      new TestConfiguration("0 $and true", 0),

      new TestConfiguration("\"1\" $and true", true),
      new TestConfiguration("\"0\" $and true", true),
    ];

    TestHelper.runTests(tests);
  }
}

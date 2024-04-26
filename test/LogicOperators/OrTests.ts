import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class OrTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("true || true", true),
      new TestConfiguration("false || true", true),
      new TestConfiguration("false || false", false),

      new TestConfiguration("1 || true", 1),
      // eslint-disable-next-line no-magic-numbers
      new TestConfiguration("-1 || true", -1),
      new TestConfiguration("0 || true", true),
      new TestConfiguration("0 || 0", 0),

      new TestConfiguration("\"1\" || true", "1"),
      new TestConfiguration("\"0\" || true", "0"),
      new TestConfiguration("\"0\" || false", "0"),

      new TestConfiguration("true $or true", true),
      new TestConfiguration("false $or true", true),
      new TestConfiguration("false $or false", false),

      new TestConfiguration("1 $or true", 1),
      // eslint-disable-next-line no-magic-numbers
      new TestConfiguration("-1 $or true", -1),
      new TestConfiguration("0 $or true", true),
      new TestConfiguration("0 $or 0", 0),

      new TestConfiguration("\"1\" $or true", "1"),
      new TestConfiguration("\"0\" $or true", "0"),
      new TestConfiguration("\"0\" $or false", "0"),
    ];

    TestHelper.runTests(tests);
  }
}

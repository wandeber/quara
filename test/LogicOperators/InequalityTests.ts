import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class InequalityTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("6 != 6", false),
      new TestConfiguration("6 != 5", true),
      new TestConfiguration("6.8 != 6.8", false),
      new TestConfiguration("6 != 6.8", true),
      new TestConfiguration("-6.8 != -6.8", false),
      new TestConfiguration("6 != -6.8", true),
      new TestConfiguration("\"un string\" != \"un string\"", false),
      new TestConfiguration("\"un string\" != \"otro string\"", true),
      new TestConfiguration("true != true", false),
      new TestConfiguration("true != false", true),
      new TestConfiguration("false != false", false),

      // Same value, different types:
      new TestConfiguration("1 != true", true),
      new TestConfiguration("0 != false", true),
      new TestConfiguration("\"1\" != 1", true),

      // Special and odd cases:
      new TestConfiguration("0 != -0", false),
      new TestConfiguration("-0 != -0", false),
      new TestConfiguration("+0 != -0", false),
      new TestConfiguration("\"str\" != \"str\" != false", false),
      new TestConfiguration("\"str\" != \"str 2\" != false", true),


      // Constants comparison:
      new TestConfiguration("6 $ne 6", false),
      new TestConfiguration("6 $ne 5", true),
      new TestConfiguration("6.8 $ne 6.8", false),
      new TestConfiguration("6 $ne 6.8", true),
      new TestConfiguration("-6.8 $ne -6.8", false),
      new TestConfiguration("6 $ne -6.8", true),
      new TestConfiguration("\"un string\" $ne \"un string\"", false),
      new TestConfiguration("\"un string\" $ne \"otro string\"", true),
      new TestConfiguration("true $ne true", false),
      new TestConfiguration("true $ne false", true),
      new TestConfiguration("false $ne false", false),

      // Same value, different types:
      new TestConfiguration("1 $ne true", true),
      new TestConfiguration("0 $ne false", true),
      new TestConfiguration("\"1\" $ne 1", true),

      // Special and odd cases:
      new TestConfiguration("0 $ne -0", false),
      new TestConfiguration("-0 $ne -0", false),
      new TestConfiguration("+0 $ne -0", false),
      new TestConfiguration("\"str\" $ne \"str\" $ne false", false),
      new TestConfiguration("\"str\" $ne \"str 2\" $ne false", true),
    ];

    TestHelper.runTests(tests);
  }
}

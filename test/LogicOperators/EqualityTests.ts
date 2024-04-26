import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class EqualityTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("6 == 6", true),
      new TestConfiguration("6 == 5", false),
      new TestConfiguration("6.8 == 6.8", true),
      new TestConfiguration("6 == 6.8", false),
      new TestConfiguration("-6.8 == -6.8", true),
      new TestConfiguration("6 == -6.8", false),
      new TestConfiguration("\"un string\" == \"un string\"", true),
      new TestConfiguration("\"un string\" == \"otro string\"", false),
      new TestConfiguration("true == true", true),
      new TestConfiguration("true == false", false),
      new TestConfiguration("false == false", true),

      // Same value, different types:
      new TestConfiguration("1 == true", false),
      new TestConfiguration("0 == false", false),
      new TestConfiguration("\"1\" == 1", false),

      // Special and odd cases:
      new TestConfiguration("0 == -0", true),
      new TestConfiguration("-0 == -0", true),
      new TestConfiguration("+0 == -0", true),
      new TestConfiguration("\"str\" == \"str\" == false", false),
      new TestConfiguration("\"str\" == \"str 2\" == false", true),

      // Constants comparison:
      new TestConfiguration("6 $eq 6", true),
      new TestConfiguration("6 $eq 5", false),
      new TestConfiguration("6.8 $eq 6.8", true),
      new TestConfiguration("6 $eq 6.8", false),
      new TestConfiguration("-6.8 $eq -6.8", true),
      new TestConfiguration("6 $eq -6.8", false),
      new TestConfiguration("\"un string\" $eq \"un string\"", true),
      new TestConfiguration("\"un string\" $eq \"otro string\"", false),
      new TestConfiguration("true $eq true", true),
      new TestConfiguration("true $eq false", false),
      new TestConfiguration("false $eq false", true),

      // Same value, different types:
      new TestConfiguration("1 $eq true", false),
      new TestConfiguration("0 $eq false", false),
      new TestConfiguration("\"1\" $eq 1", false),

      // Special and odd cases:
      new TestConfiguration("0 $eq -0", true),
      new TestConfiguration("-0 $eq -0", true),
      new TestConfiguration("+0 $eq -0", true),
      new TestConfiguration("\"str\" $eq \"str\" $eq false", false),
      new TestConfiguration("\"str\" $eq \"str 2\" $eq false", true),
    ];

    TestHelper.runTests(tests);
  }
}

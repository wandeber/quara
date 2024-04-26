import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class LaxEqualityTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("6 ~= 6", true),
      new TestConfiguration("6 ~= 5", false),
      new TestConfiguration("6.8 ~= 6.8", true),
      new TestConfiguration("6 ~= 6.8", false),
      new TestConfiguration("-6.8 ~= -6.8", true),
      new TestConfiguration("6 ~= -6.8", false),
      new TestConfiguration("\"un string\" ~= \"un string\"", true),
      new TestConfiguration("\"un string\" ~= \"otro string\"", false),
      new TestConfiguration("true ~= true", true),
      new TestConfiguration("true ~= false", false),
      new TestConfiguration("false ~= false", true),

      // Same value, different types:
      new TestConfiguration("1 ~= true", true),
      new TestConfiguration("0 ~= false", true),
      new TestConfiguration("\"1\" ~= 1", true),

      // Special and odd cases:
      new TestConfiguration("0 ~= -0", true),
      new TestConfiguration("-0 ~= -0", true),
      new TestConfiguration("+0 ~= -0", true),
      new TestConfiguration("\"str\" ~= \"str\" ~= false", false),
      new TestConfiguration("\"str\" ~= \"str 2\" ~= false", true),


      // Constants comparison:
      new TestConfiguration("6 $leq 6", true),
      new TestConfiguration("6 $leq 5", false),
      new TestConfiguration("6.8 $leq 6.8", true),
      new TestConfiguration("6 $leq 6.8", false),
      new TestConfiguration("-6.8 $leq -6.8", true),
      new TestConfiguration("6 $leq -6.8", false),
      new TestConfiguration("\"un string\" $leq \"un string\"", true),
      new TestConfiguration("\"un string\" $leq \"otro string\"", false),
      new TestConfiguration("true $leq true", true),
      new TestConfiguration("true $leq false", false),
      new TestConfiguration("false $leq false", true),

      // Same value, different types:
      new TestConfiguration("1 $leq true", true),
      new TestConfiguration("0 $leq false", true),
      new TestConfiguration("\"1\" $leq 1", true),

      // Special and odd cases:
      new TestConfiguration("0 $leq -0", true),
      new TestConfiguration("-0 $leq -0", true),
      new TestConfiguration("+0 $leq -0", true),
      new TestConfiguration("\"str\" $leq \"str\" $leq false", false),
      new TestConfiguration("\"str\" $leq \"str 2\" $leq false", true),
    ];

    TestHelper.runTests(tests);
  }
}

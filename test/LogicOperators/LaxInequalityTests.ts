import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class LaxInequalityTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("6 !~= 6", false),
      new TestConfiguration("6 !~= 5", true),
      new TestConfiguration("6.8 !~= 6.8", false),
      new TestConfiguration("6 !~= 6.8", true),
      new TestConfiguration("-6.8 !~= -6.8", false),
      new TestConfiguration("6 !~= -6.8", true),
      new TestConfiguration("\"un string\" !~= \"un string\"", false),
      new TestConfiguration("\"un string\" !~= \"otro string\"", true),
      new TestConfiguration("true !~= true", false),
      new TestConfiguration("true !~= false", true),
      new TestConfiguration("false !~= false", false),

      // Same value, different types:
      new TestConfiguration("1 !~= true", false),
      new TestConfiguration("0 !~= false", false),
      new TestConfiguration("\"1\" !~= 1", false),

      // Special and odd cases:
      new TestConfiguration("0 !~= -0", false),
      new TestConfiguration("-0 !~= -0", false),
      new TestConfiguration("+0 !~= -0", false),
      new TestConfiguration("\"str\" !~= \"str\" !~= false", false),
      new TestConfiguration("\"str\" !~= \"str 2\" !~= false", true),


      // Constants comparison:
      new TestConfiguration("6 $lne 6", false),
      new TestConfiguration("6 $lne 5", true),
      new TestConfiguration("6.8 $lne 6.8", false),
      new TestConfiguration("6 $lne 6.8", true),
      new TestConfiguration("-6.8 $lne -6.8", false),
      new TestConfiguration("6 $lne -6.8", true),
      new TestConfiguration("\"un string\" $lne \"un string\"", false),
      new TestConfiguration("\"un string\" $lne \"otro string\"", true),
      new TestConfiguration("true $lne true", false),
      new TestConfiguration("true $lne false", true),
      new TestConfiguration("false $lne false", false),

      // Same value, different types:
      new TestConfiguration("1 $lne true", false),
      new TestConfiguration("0 $lne false", false),
      new TestConfiguration("\"1\" $lne 1", false),

      // Special and odd cases:
      new TestConfiguration("0 $lne -0", false),
      new TestConfiguration("-0 $lne -0", false),
      new TestConfiguration("+0 $lne -0", false),
      new TestConfiguration("\"str\" $lne \"str\" $lne false", false),
      new TestConfiguration("\"str\" $lne \"str 2\" $lne false", true),
    ];

    TestHelper.runTests(tests);
  }
}

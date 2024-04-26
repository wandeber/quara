import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";



export class StringFunctionsTests {
  static test() {
    const tests: TestConfiguration[] = [
      // length
      new TestConfiguration('length("")', 0),
      new TestConfiguration('length("test")', 4),

      // split
      new TestConfiguration('split("", ",")', [""]),
      new TestConfiguration('split("test", ",")', ["test"]),
      new TestConfiguration('split("test,test", ",")', ["test", "test"]),

      // join
      new TestConfiguration('join([], ",")', ""),
      new TestConfiguration('join(["test"], ",")', "test"),
      new TestConfiguration('join(["test", "test"], ",")', "test,test"),

      // upperCase
      new TestConfiguration('upperCase("")', ""),
      new TestConfiguration('upperCase("test")', "TEST"),

      // lowerCase
      new TestConfiguration('lowerCase("")', ""),
      new TestConfiguration('lowerCase("TEST")', "test"),

      // trim
      new TestConfiguration('trim("")', ""),
      new TestConfiguration('trim(" test")', "test"),
      new TestConfiguration('trim("test ")', "test"),
      new TestConfiguration('trim(" test ")', "test"),
    ];

    TestHelper.runTests(tests);
  }
}

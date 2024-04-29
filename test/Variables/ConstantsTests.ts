import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class ConstantsTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("const a = 1; a;", 1),
      new TestConfiguration("const a = 1; a = 3").toThrow(),
      new TestConfiguration("const a;").toThrow(),
      new TestConfiguration("const a, b = 2;").toThrow(),
    ];

    TestHelper.runTests(tests);
  }
}

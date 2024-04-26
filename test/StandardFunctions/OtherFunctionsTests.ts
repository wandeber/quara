import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";



export class OtherFunctionsTests {
  static test() {
    const tests: TestConfiguration[] = [
      // log
      new TestConfiguration("log(4)", undefined),

      // print
      new TestConfiguration("print(4)", 4),
      new TestConfiguration('print("¡Hola, mundo!")', "¡Hola, mundo!"),
    ];

    TestHelper.runTests(tests);
  }
}

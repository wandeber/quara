import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class FunctionDeclTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration('fn hello() {a = "Hola, mundo!"; a;}; hello();', "Hola, mundo!"),
      new TestConfiguration('fn test() {a = 1; return a; b = 3; return b;} test();', 1),
      new TestConfiguration('fn suma(a, b) {return a + b;} suma(1, 4)', 5),
    ];

    TestHelper.runTests(tests);
  }
}

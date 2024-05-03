import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class ForTests {
  static test() {
    const tests: TestConfiguration[] = [
      /*
      Syntaxes:
      - `for i in 1..5 {log(i)}`
      - `for v, i in 5..10 {log(i +": "+ v);}`
      - `for 1..5 {log("Hola")}`
      - `for 1..5: log("Hola") /for`
      - `for 1..5 -> log("Hola")`
      */
      new TestConfiguration("r = 0; for 1..5 {r += 1}; r;", 5),
      new TestConfiguration("r = 0; for i in 1..5 {r += i}; r;", 15),
      new TestConfiguration("r = 0; for v, k in 5..10 {r += k}; r;", 15),
      new TestConfiguration("r = 0; for v, k in 5..<10 {r += v;}; r;", 35),
      new TestConfiguration("r = 0; for 1..5 -> r += 1; r;", 5),
      new TestConfiguration("r = 0; for i in 1..5 -> r += i; r;", 15),
      new TestConfiguration("r = 0; for v, k in 5..10 -> r += k; r;", 15),
      new TestConfiguration("r = 0; for v, k in 5..<10 -> r += v; r;", 35),
      new TestConfiguration("r = 0; for v, k in 5..<10: r += v /for r;", 35),
      new TestConfiguration("r = 0; for 1..5 -> r += 1; r;", 5),
      // Objects (Maps):
      new TestConfiguration("r = 0; for v in {a: 6, b: 3, c: 5} {r += v}; r", 14),
      // Output:
      new TestConfiguration('r = `{for v in 1..5 -> v}`', "12345"),
      // Errors:
      // Iterable should be an array:
      new TestConfiguration("for v in 5 {v}").toThrow(),
    ];

    TestHelper.runTests(tests);
  }
}

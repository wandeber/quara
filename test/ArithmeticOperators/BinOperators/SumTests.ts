import {TestConfiguration} from "../../TestConfiguration";
import {TestHelper} from "../../TestHelper";




export class SumTests {
  static test() {
    let num1 = 6;
    let num2 = 3;
    let num3 = 5;
    let dec1 = 6.2;
    let dec2 = 3.7;
    let dec3 = 5.1;

    const tests: TestConfiguration[] = [
      new TestConfiguration(`${num1} + ${num2}`, num1 + num2),
      new TestConfiguration(`${num1} + ${num2} + ${num3}`, num1 + num2 + num3),
      new TestConfiguration(`${dec1} + ${dec2}`, dec1 + dec2),
      new TestConfiguration(`${dec1} + ${dec2} + ${dec3}`, dec1 + dec2 + dec3),
      new TestConfiguration(`0 + ${num2}`, 0 + num2),
      new TestConfiguration(`${num2} + 0`, num2 + 0),
      new TestConfiguration(`0 + ${dec2}`, 0 + dec2),
      new TestConfiguration(`${dec2} + 0`, dec2 + 0),

      // Strings:
      new TestConfiguration('"a" + "b"', "ab"),
      new TestConfiguration('"a" + 1', "a1"),

      // Arrays:
      new TestConfiguration("[1, 2, 3] + [4, 5, 6]", [1, 2, 3, 4, 5, 6]),
      new TestConfiguration("[1, 2, 3] + 4", [1, 2, 3, 4]),
      new TestConfiguration("0 + [1, 2, 3]", [0, 1, 2, 3]),

      // Objects:
      // new TestConfiguration("{a: 1, b: 2} + {c: 3, d: 4}", {a: 1, b: 2, c: 3, d: 4}),

      // Errors:
    ];

    TestHelper.runTests(tests);
  }
}

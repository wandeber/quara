import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";



export class MathFunctionsTests {
  static test() {
    const tests: TestConfiguration[] = [
      // abs
      new TestConfiguration("abs(-4)", 4),
      new TestConfiguration("abs(4)", 4),
      new TestConfiguration("abs(0)", 0),
      new TestConfiguration("abs(-0)", 0),
      new TestConfiguration("abs(-4.5)", 4.5),
      new TestConfiguration("abs(4.5)", 4.5),

      // ceil
      new TestConfiguration("ceil(4)", 4),
      new TestConfiguration("ceil(4.5)", 5),
      new TestConfiguration("ceil(-4)", -4),
      new TestConfiguration("ceil(-4.5)", -4),

      // floor
      new TestConfiguration("floor(4)", 4),
      new TestConfiguration("floor(4.5)", 4),
      new TestConfiguration("floor(-4)", -4),
      new TestConfiguration("floor(-4.5)", -5),

      // round
      new TestConfiguration("round(4)", 4),
      new TestConfiguration("round(4.5)", 5),
      new TestConfiguration("round(-4)", -4),
      new TestConfiguration("round(-4.5)", -4),

      // trunc
      new TestConfiguration("trunc(4)", 4),
      new TestConfiguration("trunc(4.5)", 4),
      new TestConfiguration("trunc(-4)", -4),
      new TestConfiguration("trunc(-4.5)", -4),

      // Max
      new TestConfiguration("max(1, 4)", 4),

      // Min
      new TestConfiguration("min(1, 4)", 1),
    ];

    TestHelper.runTests(tests);
  }
}

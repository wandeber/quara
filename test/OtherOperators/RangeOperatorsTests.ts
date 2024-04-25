import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";



export default class RangeOperatorsTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("arr = 1..4; arr;", [1, 2, 3, 4]),
      new TestConfiguration("arr = 1..<4; arr;", [1, 2, 3]),
      new TestConfiguration("a = 1; b = 4; arr = a..b; arr;", [1, 2, 3, 4]),
      new TestConfiguration("a = 1; b = 4; arr = a..<b; arr;", [1, 2, 3]),
      new TestConfiguration("a = 1; arr = a..4; arr;", [1, 2, 3, 4]),
      new TestConfiguration("a = 1; arr = a..<4; arr;", [1, 2, 3]),
      new TestConfiguration("b = 4; arr = 1..b; arr;", [1, 2, 3, 4]),
      new TestConfiguration("b = 4; arr = 1..<b; arr;", [1, 2, 3]),
    ];

    TestHelper.runTests(tests);
  }
}

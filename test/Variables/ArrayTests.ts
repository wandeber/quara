import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class ArrayTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("a = [1, 2, 3]; a;", [1, 2, 3]),
      new TestConfiguration("a = [1, 2, 3]; a[0];", 1),
      new TestConfiguration("a = [1, 2, 3]; k = 1; a[k]", 2),
      new TestConfiguration("a = [1, 2, 3]; a[0] = 2; a[0];", 2),
      new TestConfiguration("a = [1, 2, 3]; k = 1; a[k] = 3; a[k];", 3),
      new TestConfiguration("a = [1, 2, 3]; a.length;", 3),

      new TestConfiguration("a = [1, 2, 3]; a.{0};", 1),
      new TestConfiguration("a = [1, 2, 3]; k = 1; a.{k}", 2),
      new TestConfiguration("a = [1, 2, 3]; a.{0} = 2; a.{0};", 2),
      new TestConfiguration("a = [1, 2, 3]; k = 1; a.{k} = 3; a.{k};", 3),

      new TestConfiguration("a = 1; a[0] = 1;").toThrow(),
    ];

    TestHelper.runTests(tests);
  }
}

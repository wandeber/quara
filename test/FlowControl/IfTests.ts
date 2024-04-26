import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class IfTests {
  static test() {
    const tests: TestConfiguration[] = [
      // BLock:
      new TestConfiguration("if 1 {1}", 1),
      new TestConfiguration("if 0 {1}", undefined),
      new TestConfiguration("if (1) {1}", 1),
      new TestConfiguration("if (0) {1}", undefined),

      // One line:
      new TestConfiguration("if 1 -> 1", 1),
      new TestConfiguration("if 0 -> 1", undefined),
      new TestConfiguration("if (1) 1", 1),
      new TestConfiguration("if (0) 1", undefined),

      // Colon block:
      new TestConfiguration("if 1: 1; /if", 1),
      new TestConfiguration("if 0: 1; /if", undefined),
      new TestConfiguration("if (1): 1 /if", 1),
      new TestConfiguration("if (0): 1 /if", undefined),

      new TestConfiguration("if (1) {1} else 2", 1),
      new TestConfiguration("if (0) {1} else 2", 2),
      new TestConfiguration("if (0) {1} else {2}", 2),
      new TestConfiguration("if (0) 1 else {2}", 2),
      new TestConfiguration("if (0) 1 else if (2) {2}", 2),
      new TestConfiguration("if (0) 1 else if (0) {2}", undefined),
      new TestConfiguration("if (0) 1 else if (0) {2} else 3", 3),
      new TestConfiguration("var b = false; if (b) 1 else 1 + 1", 2),
      new TestConfiguration("var b = true; if (b) 10 + 4 else 1 + 1", 14),
      new TestConfiguration("var n = 1; if (n == 1) 10 + 4; else 1 + 1", 14),

      // Else with colon block:
      new TestConfiguration("if 0: 1 else: 2 /if;", 2),
      new TestConfiguration("if 0: 1 else if 2: 2 /if;", 2),
    ];

    TestHelper.runTests(tests);
  }
}

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

      // Scope tests:
      new TestConfiguration("var a = 1; if 1 {var a = 2}; a", 1),
      new TestConfiguration("var a = 1; if 0 {var a = 2} else {var a = 3}; a", 1),
      new TestConfiguration("var a = 1; if 1 {a = 2} ", 2),
      new TestConfiguration("var a = 1; if 0 {a = 2} else {a = 3} ", 3),
      new TestConfiguration("if b = 1 {b}", 1),
      new TestConfiguration("if b = 1 {a = 1}; b", undefined),
      new TestConfiguration("var b; if b = 1 {a = 1}; b", 1),
    ];

    TestHelper.runTests(tests);
  }
}

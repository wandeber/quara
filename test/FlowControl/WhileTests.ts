import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class WhileTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var i = 0; while (i < 5) {i = i + 1;} 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) {i = i + 1} 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) i = i + 1; 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) ++i; 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5) -> ++i; 9 + i", 14),
      new TestConfiguration("var i = 0; while i < 5 -> ++i; 9 + i", 14),
      new TestConfiguration("var i = 0; while i < 5 {++i;} 9 + i", 14),
      new TestConfiguration("var i = 0; while i < 5: ++i; /while; 9 + i", 14),
      new TestConfiguration("var i = 0; while (i < 5): ++i; /while; 9 + i", 14),

      // Scopes:
      new TestConfiguration("var i = 0; while (i < 5) {var j = 1; i = i + 1;} j", undefined),
      new TestConfiguration("var i = 0; while (i < 5) {var j = 1; i = i + 1;} i", 5),
    ];

    TestHelper.runTests(tests);
  }
}

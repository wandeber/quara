import {TestConfiguration} from "./TestConfiguration";
import {TestHelper} from "./TestHelper";





export class CommentsTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("2; // 2 + 2; 4", 2),
      new TestConfiguration("var num = 2 /* Comentario de bloque */; num = num + 2; num", 4),
    ];

    TestHelper.runTests(tests);
  }
}

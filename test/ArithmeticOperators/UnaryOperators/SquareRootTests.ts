import TestConfiguration from "../../TestConfiguration";
import TestHelper from "../../TestHelper";





export default class SquareRootTests {
  static test() {
    let num1 = 6;
    let num2 = -3;
    let num3 = 6.2;
    let num4 = -3.2;

    const tests: TestConfiguration[] = [
      new TestConfiguration([`¬/ ${num1}`, `¬/${num1}`], Math.sqrt(num1)),
      new TestConfiguration([`¬/ ¬/ ¬/ ${num1}`, `¬/ ¬/¬/${num1}`], Math.sqrt(Math.sqrt(Math.sqrt(num1)))),

      new TestConfiguration([`¬/ ${num2}`, `¬/${num2}`], Math.sqrt(num2)),
      new TestConfiguration([`¬/ ¬/ ¬/ ${num2}`, `¬/ ¬/¬/${num2}`], Math.sqrt(Math.sqrt(Math.sqrt(num2)))),

      new TestConfiguration([`¬/ ${num3}`, `¬/${num3}`], Math.sqrt(num3)),
      new TestConfiguration([`¬/ ¬/ ¬/ ${num3}`, `¬/ ¬/¬/${num3}`], Math.sqrt(Math.sqrt(Math.sqrt(num3)))),

      new TestConfiguration([`¬/ ${num4}`, `¬/${num4}`], Math.sqrt(num4)),
      new TestConfiguration([`¬/ ¬/ ¬/ ${num4}`, `¬/ ¬/¬/${num4}`], Math.sqrt(Math.sqrt(Math.sqrt(num4)))),

      new TestConfiguration("¬/ 0", Math.sqrt(0)),
      new TestConfiguration("¬/ 1", Math.sqrt(1)),
    ];

    TestHelper.runTests(tests);
  }
}

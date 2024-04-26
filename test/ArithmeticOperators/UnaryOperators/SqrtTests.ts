import {TestConfiguration as TestConf} from "../../TestConfiguration";
import {TestHelper} from "../../TestHelper";





export class SqrtTests {
  static test() {
    let num1 = 6;
    let num2 = -3;
    let num3 = 6.2;
    let num4 = -3.2;

    const tests: TestConf[] = [
      new TestConf([`¬/ ${num1}`, `¬/${num1}`], Math.sqrt(num1)),
      new TestConf([`¬/ ¬/ ¬/ ${num1}`, `¬/ ¬/¬/${num1}`], Math.sqrt(Math.sqrt(Math.sqrt(num1)))),

      new TestConf([`¬/ ${num2}`, `¬/${num2}`], Math.sqrt(num2)),
      new TestConf([`¬/ ¬/ ¬/ ${num2}`, `¬/ ¬/¬/${num2}`], Math.sqrt(Math.sqrt(Math.sqrt(num2)))),

      new TestConf([`¬/ ${num3}`, `¬/${num3}`], Math.sqrt(num3)),
      new TestConf([`¬/ ¬/ ¬/ ${num3}`, `¬/ ¬/¬/${num3}`], Math.sqrt(Math.sqrt(Math.sqrt(num3)))),

      new TestConf([`¬/ ${num4}`, `¬/${num4}`], Math.sqrt(num4)),
      new TestConf([`¬/ ¬/ ¬/ ${num4}`, `¬/ ¬/¬/${num4}`], Math.sqrt(Math.sqrt(Math.sqrt(num4)))),

      new TestConf("¬/ 0", Math.sqrt(0)),
      new TestConf("¬/ 1", Math.sqrt(1)),
    ];

    TestHelper.runTests(tests);
  }
}

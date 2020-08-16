

import TestConfiguration from "../../TestConfiguration";
import TestHelper from "../../TestHelper";





export default class ModulusTests {
  static test() {
    let num1 = 6,
        num2 = 3,
        num3 = 5,
        dec1 = 6.2,
        dec2 = 3.7,
        dec3 = 5.1;
    
    const tests: TestConfiguration[] = [
      new TestConfiguration(`${num1} % ${num2}`, num1 % num2),
      new TestConfiguration(`${num1} % ${num2} % ${num3}`, num1 % num2 % num3),
      new TestConfiguration(`${dec1} % ${dec2}`, dec1 % dec2),
      new TestConfiguration(`${dec1} % ${dec2} % ${dec3}`, dec1 % dec2 % dec3),
      new TestConfiguration(`0 % ${num2}`, 0 % num2),
      new TestConfiguration(`${num2} % 0`, num2 % 0),
      new TestConfiguration(`0 % ${dec2}`, 0 % dec2),
      new TestConfiguration(`${dec2} % 0`, dec2 % 0),
    ];
  
    TestHelper.runTests(tests);
  }
}

import TestConfiguration from "../../TestConfiguration";
import TestHelper from "../../TestHelper";





export default class ExponentiationTests {
  static test1() {
    let num1 = 4,
        num2 = 1,
        //num3 = 3,
        dec1 = 4.2,
        dec2 = 2.7;
        //dec3 = 3.1;
    
    const tests: TestConfiguration[] = [
      new TestConfiguration(`${num1} ** ${num2}`, num1 ** num2),
      //new TestConfiguration(`${num1} ** ${num2} ** ${num3}`, num1 ** num2 ** num3),
      new TestConfiguration(`${dec1} ** ${dec2}`, dec1 ** dec2),
      //new TestConfiguration(`${dec1} ** ${dec2} ** ${dec3}`, dec1 ** dec2 ** dec3),
      new TestConfiguration(`0 ** ${num2}`, 0 ** num2),
      new TestConfiguration(`${num2} ** 0`, num2 ** 0),
      new TestConfiguration(`0 ** ${dec2}`, 0 ** dec2),
      new TestConfiguration(`${dec2} ** 0`, dec2 ** 0),
    ];
  
    TestHelper.runTests(tests);
  }
  
  static test2() {
    let num1 = 4,
        num2 = 1,
        //num3 = 3,
        dec1 = 4.2,
        dec2 = 1.7;
        //dec3 = 3.1;
    
    const tests: TestConfiguration[] = [
      new TestConfiguration(`${num1} ^ ${num2}`, num1 ** num2),
      //new TestConfiguration(`${num1} ^ ${num2} ^ ${num3}`, num1 ** num2 ** num3),
      new TestConfiguration(`${dec1} ^ ${dec2}`, dec1 ** dec2),
      //new TestConfiguration(`${dec1} ^ ${dec2} ^ ${dec3}`, dec1 ** dec2 ** dec3),
      new TestConfiguration(`0 ^ ${num2}`, 0 ** num2),
      new TestConfiguration(`${num2} ^ 0`, num2 ** 0),
      new TestConfiguration(`0 ^ ${dec2}`, 0 ** dec2),
      new TestConfiguration(`${dec2} ^ 0`, dec2 ** 0),
    ];
  
    TestHelper.runTests(tests);
  }

  static test() {
    ExponentiationTests.test1();
    ExponentiationTests.test2();
  }
}

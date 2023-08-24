import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class VariableDeclarationTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var num = 1; num;", 1),
      new TestConfiguration("var num = 1; num = 3; num;", 3),
      new TestConfiguration("var num1 = 1; var num2 = 3; num1 + num2;", 4),
      new TestConfiguration("var num1 = 1, num2 = 3; num1 + num2;", 4),
      new TestConfiguration("var num1, num2; num1 = num2 = 4; num1 + num2;", 8),
      new TestConfiguration("var num1 = 2, num2 = num1; num1 + num2;", 4),

      new TestConfiguration("const num = 1; num;", 1),
      // new TestConfiguration("const num = 1; num = 3; num;", 3),
      new TestConfiguration("const num1 = 1; const num2 = 3; num1 + num2;", 4),
      new TestConfiguration("const num1 = 1, num2 = 3; num1 + num2;", 4),

      new TestConfiguration("int num = 1; num;", 1),
      new TestConfiguration("integer num = 1; num;", 1),
      new TestConfiguration("float num = 1.4; num = 3.4; num;", 3.4),
      new TestConfiguration('string str = "asd"; str;', "asd"),
      new TestConfiguration("bool a = false; a;", false),
      new TestConfiguration("boolean a = true; a;", true),
      new TestConfiguration("var int num = 1; num;", 1),
      new TestConfiguration("const int num = 1; num;", 1),
      // new TestConfiguration("const num = 1; num = 3; num;", 3),
    ];

    TestHelper.runTests(tests);
  }
}

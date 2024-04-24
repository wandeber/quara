import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class ObjectDeclarationTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("var obj = {a: 1}; obj.a;", 1),
    ];

    TestHelper.runTests(tests);
  }
}

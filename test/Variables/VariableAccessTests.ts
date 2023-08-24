import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class VariableDeclarationTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("sampleObject.prop1", "prop1 value"),
      // new TestConfiguration("sampleObject.prop3.prop31", "prop31 value"),
      new TestConfiguration("sampleSimpleArray[1];", "value 2"),
      // new TestConfiguration("sampleSimpleArray[2][2];", 3),
    ];

    TestHelper.runTests(tests);
  }
}

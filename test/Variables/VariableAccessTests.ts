import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class VariableDeclarationTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("obj.prop1", "prop1 value", {obj: {prop1: "prop1 value"}}),
      // new TestConfiguration("sampleObject.prop3.prop31", "prop31 value"),
      new TestConfiguration("arr[1];", 2, {arr: [1, 2, 3]}),
      // new TestConfiguration("sampleSimpleArray[2][2];", 3),
    ];

    TestHelper.runTests(tests);
  }
}

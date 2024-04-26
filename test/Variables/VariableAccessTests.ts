import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class VariableAccessTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("obj.prop1", "prop1 value", {obj: {prop1: "prop1 value"}}),
      // new TestConfiguration('obj["prop1"]', "prop1 value", {obj: {prop1: "prop1 value"}}),
      // new TestConfiguration('var name = "prop1"; obj[name]', "prop1 value", {obj: {prop1: "prop1 value"}}),
      new TestConfiguration('obj.{"prop1"}', "prop1 value", {obj: {prop1: "prop1 value"}}),
      new TestConfiguration('var name = "prop1"; obj.{name}', "prop1 value", {obj: {prop1: "prop1 value"}}),
      // Escaping:
      new TestConfiguration('var text = "\\` \\{ \\n"; text;', "` { \n"),
      // new TestConfiguration("sampleObject.prop3.prop31", "prop31 value"),
      new TestConfiguration("arr[1];", 2, {arr: [1, 2, 3]}),
      // new TestConfiguration("sampleSimpleArray[2][2];", 3),
    ];

    TestHelper.runTests(tests);
  }
}

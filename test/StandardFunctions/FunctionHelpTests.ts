import {DefaultVariables, Documentation} from "../../src/Interpreter/Interpreter";
import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";



export default class FunctionHelpTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("help()", Documentation.get("help")),
    ];

    Object.keys(DefaultVariables).forEach((key: string) => {
      tests.push(new TestConfiguration(`help(${key})`, Documentation.get(key)));
    });

    TestHelper.runTests(tests);
  }
}

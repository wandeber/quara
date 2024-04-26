import {DefaultVariables, Documentation} from "../../src/globalScope";
import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";



export class FunctionHelpTests {
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

import {getGlobalScope} from "../../src/globalScope";
import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";

const globalScope = getGlobalScope();

export class FunctionHelpTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("help()", globalScope.getDoc("help")),
    ];

    Object.keys(globalScope.members.keys()).forEach((key: string) => {
      tests.push(new TestConfiguration(`help("${key}")`, globalScope.getDoc(key)));
    });

    TestHelper.runTests(tests);
  }
}

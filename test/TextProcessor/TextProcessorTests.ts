import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class TextProcessorTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("`14`", "14"),
      new TestConfiguration("`{14}`", "14"),
      new TestConfiguration("`{10 + 4}`", "14"),
      new TestConfiguration("var a = 14; `{a}`", "14"),
      new TestConfiguration("var a = 14; a = `{a}`; a", "14"),

      // Escaping:
      new TestConfiguration("`\\` \\{ \\n\\r\\t`", "` { \n\r\t"),

      // If:
      new TestConfiguration("var name = true; `Hola{if name:}, Sara{/if}!`", "Hola, Sara!"),
      new TestConfiguration("var name = false; `Hola{if name:}, Sara{/if}!`", "Hola!"),
      new TestConfiguration("`Hola{if nonDefined:}, Sara{/if}!`", "Hola!"),

      // While:
      new TestConfiguration("var i = 1; `0{while i < 5:}, {i}{i += 1}{/while}.`", "0, 1, 2, 3, 4."),
    ];

    TestHelper.runTests(tests);
  }
}

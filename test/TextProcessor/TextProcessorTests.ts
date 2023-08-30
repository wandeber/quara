import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class TextProcessorTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("`14`", "14"),
      new TestConfiguration("`{14}`", "14"),
      new TestConfiguration("`{10 + 4}`", "14"),
      new TestConfiguration("var a = 14; `{a}`", "14"),
      new TestConfiguration("var a = 14; a = `{a}`; a", "14"),

      // If:
      new TestConfiguration("var name = true; `Hola{if name:}, Sara{endif}!`", "Hola, Sara!"),
      new TestConfiguration("var name = false; `Hola{if name:}, Sara{endif}!`", "Hola!"),
      new TestConfiguration("`Hola{if nonDefined:}, Sara{endif}!`", "Hola!"),

      // While:
      new TestConfiguration("var i = 1; `0{while i < 5:}, {i}{i += 1}{endwhile}.`", "0, 1, 2, 3, 4."),
    ];

    TestHelper.runTests(tests);
  }
}

import {TestConfiguration} from "../TestConfiguration";
import {TestHelper} from "../TestHelper";





export class InTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration('"und" in "Hola, mundo!"', true),
      new TestConfiguration('"mundo" in ["hola", "mundo", "cruel"]', true),
      new TestConfiguration('"saludo" in {despedida: "Adiós", saludo: "Hola"}', true),

      // False cases
      new TestConfiguration('"adiós" in "Hola, mundo!"', false),
      new TestConfiguration('"adiós" in ["hola", "mundo", "cruel"]', false),
      new TestConfiguration('"saludo" in {despedida: "Adiós"}', false),

      // Error cases
      new TestConfiguration('"adiós" in 1').toThrow(),
    ];

    TestHelper.runTests(tests);
  }
}

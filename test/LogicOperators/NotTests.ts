import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class NotTests {
  static test() {
    let bool1 = true,
        bool2 = false;
    
    const tests: TestConfiguration[] = [
      new TestConfiguration([`! ${bool1}`, `!${bool1}`], !bool1),
      // eslint-disable-next-line no-implicit-coercion
      new TestConfiguration([`! ! ! ${bool1}`, `! ! !${bool1}`], !!!bool1),
      new TestConfiguration([`! ${bool2}`, `!${bool2}`], !bool2),
      // eslint-disable-next-line no-implicit-coercion
      new TestConfiguration([`! ! ! ${bool2}`, `! ! !${bool2}`], !!!bool2),
      new TestConfiguration("!undefined", !undefined),
      new TestConfiguration("! 0", !0),
      new TestConfiguration("! 1", !1),
      // eslint-disable-next-line no-implicit-coercion
      new TestConfiguration(`!!${bool2}`, !!bool2),

      new TestConfiguration([`$not ${bool1}`, `$not${bool1}`], !bool1),
      // eslint-disable-next-line no-implicit-coercion
      new TestConfiguration([`$not $not $not ${bool1}`, `$not $not $not${bool1}`], !!!bool1),
      new TestConfiguration([`$not ${bool2}`, `$not${bool2}`], !bool2),
      // eslint-disable-next-line no-implicit-coercion
      new TestConfiguration([`$not $not $not ${bool2}`, `$not $not $not${bool2}`], !!!bool2),
      new TestConfiguration("$not 0", !0),
      new TestConfiguration("$not 1", !1),
      // eslint-disable-next-line no-implicit-coercion
      new TestConfiguration(`$not$not${bool2}`, !!bool2),
    ];
  
    TestHelper.runTests(tests);
  }
}

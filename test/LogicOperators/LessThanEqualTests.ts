import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class LessThanEqualTests {
  static test() {
    const tests: TestConfiguration[] = [
      // Constants comparison:
      new TestConfiguration("5 <= 5", true),
      new TestConfiguration("5 <= 6", true),
      new TestConfiguration("6 <= 5", false),
      new TestConfiguration("5.2 <= 5.2", true),
      new TestConfiguration("5.2 <= 5.3", true),
      new TestConfiguration("5.3 <= 5.2", false),
      new TestConfiguration("true <= true", true),
      new TestConfiguration("true <= false", false),
      new TestConfiguration("false <= true", true),
      new TestConfiguration("\"asd\" <= \"asd\"", true),
      new TestConfiguration("\"asdf\" <= \"asd\"", false),
      new TestConfiguration("\"asd\" <= \"asdf\"", true),
      
      new TestConfiguration("5 $lte 5", true),
      new TestConfiguration("5 $lte 6", true),
      new TestConfiguration("6 $lte 5", false),
      new TestConfiguration("5.2 $lte 5.2", true),
      new TestConfiguration("5.2 $lte 5.3", true),
      new TestConfiguration("5.3 $lte 5.2", false),
      new TestConfiguration("true $lte true", true),
      new TestConfiguration("true $lte false", false),
      new TestConfiguration("false $lte true", true),
      new TestConfiguration("\"asd\" $lte \"asd\"", true),
      new TestConfiguration("\"asdf\" $lte \"asd\"", false),
      new TestConfiguration("\"asd\" $lte \"asdf\"", true),
    ];
  
    TestHelper.runTests(tests);
  }
}

import TestConfiguration from "../TestConfiguration";
import TestHelper from "../TestHelper";





export default class ObjectTests {
  static test() {
    const tests: TestConfiguration[] = [
      new TestConfiguration("obj = {prop1: 1, prop2: 2}; obj;", {prop1: 1, prop2: 2}),
      new TestConfiguration("obj = {prop: 1}; obj.prop;", 1),
      new TestConfiguration('obj = {prop: 1}; obj.{"prop"};', 1),
      new TestConfiguration('obj = {prop: 1}; var name = "prop"; obj.{name};', 1),
      new TestConfiguration("obj = {prop: 1}; obj.prop = 2; obj.prop;", 2),
      new TestConfiguration("obj = {prop: 1}; obj.prop2 = 2; obj;", {prop: 1, prop2: 2}),
      new TestConfiguration('obj = {prop: 1}; obj.{"prop"} = 2; obj;', {prop: 2}),
      new TestConfiguration('obj = {prop: 1}; obj.{"prop2"} = 2; obj;', {prop: 1, prop2: 2}),
      new TestConfiguration('obj = {prop: 1}; var name = "prop"; obj.{name} = 2; obj;', {prop: 2}),
      new TestConfiguration('obj = {prop: 1}; var name = "prop2"; obj.{name} = 2; obj;', {prop: 1, prop2: 2}),

      // Errors
      new TestConfiguration('obj = {prop: 1}; obj["prop2"];').toThrow(),
      new TestConfiguration('obj = {prop: 1}; obj["prop2"] = 2;').toThrow(),
      new TestConfiguration('obj = {prop: 1}; name = "prop2"; obj[name] = 2;').toThrow(),

      // new TestConfiguration("a = 1; a.prop = 1;").toThrow(),
      new TestConfiguration('a = 1; a.{"prop"};').toThrow(),
      new TestConfiguration('a = 1; a.{"prop"} = 1;').toThrow(),
    ];

    TestHelper.runTests(tests);
  }
}

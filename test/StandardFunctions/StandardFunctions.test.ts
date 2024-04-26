import {FunctionHelpTests} from "./FunctionHelpTests";
import {StringFunctionsTests} from "./StringFunctionsTests";
import {MathFunctionsTests} from "./MathFunctionsTests";
import {TypesFunctionsTests} from "./TypesFunctionsTests";
import {OtherFunctionsTests} from "./OtherFunctionsTests";

describe("Standard functions", () => {
  describe("Help", FunctionHelpTests.test);
  describe("String functions", StringFunctionsTests.test);
  describe("Math functions", MathFunctionsTests.test);
  describe("Types functions", TypesFunctionsTests.test);
  describe("Other functions", OtherFunctionsTests.test);
});

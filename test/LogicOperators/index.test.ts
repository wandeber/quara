import {AndTests} from "./AndTests";
import {EqualityTests} from "./EqualityTests";
import {GreaterThanEqualTests} from "./GreaterThanEqualTests";
import {GreaterThanTests} from "./GreaterThanTests";
import {InequalityTests} from "./InequalityTests";
import {LaxEqualityTests} from "./LaxEqualityTests";
import {LaxInequalityTests} from "./LaxInequalityTests";
import {LessThanEqualTests} from "./LessThanEqualTests";
import {LessThanTests} from "./LessThanTests";
import {NotTests} from "./NotTests";
import {OrTests} from "./OrTests";
import {InTests} from "./InTests";


describe("Logic operators", () => {
  describe("Not (!, $not)", NotTests.test);
  describe("Equality (==, $eq)", EqualityTests.test);
  describe("Inequality (!=, $ne)", InequalityTests.test);
  describe("Lax equality (~=, $leq)", LaxEqualityTests.test);
  describe("Lax inequality (!~=, $lne)", LaxInequalityTests.test);
  describe("Less than (<, $lt)", LessThanTests.test);
  describe("Greater than (>, $gt)", GreaterThanTests.test);
  describe("Less than or equal (<=, $lte)", LessThanEqualTests.test);
  describe("Greater than or equal (>=, $gte)", GreaterThanEqualTests.test);
  describe("And (&&, $and)", AndTests.test);
  describe("Or (||, $or)", OrTests.test);
  describe("In (in, $in)", InTests.test);
});

import Types from "./Types";

describe("Types", () => {
  describe("isInteger", () => {
    it("should return true for integers", () => {
      expect(Types.isInteger(42)).toBe(true);
      expect(Types.isInteger("42")).toBe(true);
      expect(Types.isInteger(1.0)).toBe(true); // Caso especial
    });

    it("should return false for non-integers", () => {
      expect(Types.isInteger(42.5)).toBe(false);
      expect(Types.isInteger("42.5")).toBe(false);
      expect(Types.isInteger("texto")).toBe(false);
      expect(Types.isInteger(NaN)).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("should return true for numbers", () => {
      expect(Types.isNumber(42)).toBe(true);
      expect(Types.isNumber("42")).toBe(true);
      expect(Types.isNumber(42.5)).toBe(true);
      expect(Types.isNumber(-42)).toBe(true);
    });

    it("should return false for non-numbers", () => {
      expect(Types.isNumber("texto")).toBe(false);
      expect(Types.isNumber(NaN)).toBe(false);
      // expect(Types.isNumber(null)).toBe(false);
      // expect(Types.isNumber(undefined)).toBe(false);
    });
  });

  describe("isAlpha", () => {
    it("should return true for alphabetic strings", () => {
      expect(Types.isAlpha("abc")).toBe(true);
      expect(Types.isAlpha("ABC")).toBe(true);
      expect(Types.isAlpha("aBcDeF")).toBe(true);
    });

    it("should return false for non-alphabetic strings", () => {
      expect(Types.isAlpha("123")).toBe(false);
      expect(Types.isAlpha("a1b2c3")).toBe(false);
      expect(Types.isAlpha(" ")).toBe(false);
      expect(Types.isAlpha("")).toBe(false);
      expect(Types.isAlpha("!@#$")).toBe(false);
    });
  });

  describe("isAlphanumeric", () => {
    it("should return true for alphanumeric strings", () => {
      expect(Types.isAlphanumeric("abc")).toBe(true);
      expect(Types.isAlphanumeric("ABC")).toBe(true);
      expect(Types.isAlphanumeric("aBcDeF123")).toBe(true);
      expect(Types.isAlphanumeric("123456")).toBe(true);
    });

    it("should return false for non-alphanumeric strings", () => {
      expect(Types.isAlphanumeric("a1b2c3!")).toBe(false);
      expect(Types.isAlphanumeric(" ")).toBe(false);
      expect(Types.isAlphanumeric("")).toBe(false);
      expect(Types.isAlphanumeric("!@#$")).toBe(false);
    });
  });
});

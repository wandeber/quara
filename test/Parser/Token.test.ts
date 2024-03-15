import Token from "../../src/Token";
import TokenTypes from "../../src/TokenTypes";
import { expect, describe, it } from "bun:test";

describe("Token", () => {
  it("toString", () => {
    let token = new Token(TokenTypes.IntegerConstant, "123");
    expect(token.toString()).toBe("Token(IntegerConstant, 123)");
  });
});

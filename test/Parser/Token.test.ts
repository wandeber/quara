import Token from "../../src/Token";
import TokenTypes from "../../src/TokenTypes";

describe("Token", () => {
  it("toString", () => {
    let token = new Token(TokenTypes.IntConst, "123");
    expect(token.toString()).toBe("Token(IntConst, 123)");
  });
});

import {Token} from "../../src/Token";
import {TT} from "../../src/TokenTypes";

describe("Token", () => {
  it("toString", () => {
    let token = new Token(TT.IntConst, "123");
    expect(token.toString()).toBe("Token(IntConst, 123)");
  });
});

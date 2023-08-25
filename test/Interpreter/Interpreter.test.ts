import ASTVisitor from "../../src/Interpreter/ASTVisitor";
import Interpreter from "../../src/Interpreter/Interpreter";
import Lexer from "../../src/Lexer/Lexer";
import Parser from "../../src/Parser";
import Quara from "../../src/index";

describe("Interpreter", () => {
  it("Should throw a syntax error", () => {
    const quara = new Quara("1 + 2 +");
    try {
      expect(quara.run()).toThrow();
    }
    catch (e) {}
  });

  it("Variables should be added", () => {
    const lexer = new Lexer();
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.globalScope = {};
    interpreter.setVariables({prop1: 1, prop2: 2});
    interpreter.setVariables({prop3: 3, prop2: 4});
    console.log(interpreter.globalScope);
    expect(interpreter.globalScope).toStrictEqual({prop1: 1, prop2: 4, prop3: 3});
  });

  it("Visitor should be added", () => {
    const lexer = new Lexer();
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.registerVisitor(new ASTVisitor(interpreter));
    expect(interpreter.visitors.size).toBe(13);
  });
});

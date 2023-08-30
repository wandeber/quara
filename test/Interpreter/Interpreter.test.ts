import ASTVisitor from "../../src/Interpreter/ASTVisitor";
import Interpreter from "../../src/Interpreter/Interpreter";
import Lexer from "../../src/Lexer/Lexer";
import Parser from "../../src/Parser";
import Quara from "../../src/index";

describe("Interpreter", () => {
  it("Should throw a syntax error", () => {
    try {
      expect(Quara.script("1 + 2 +")).toThrow();
    }
    catch (e) {}
  });

  it("should throw lexer error for invalid characters", () => {
    try {
      expect(Quara.script("¿")).toThrow();
    }
    catch (e) {}
  });

  it("should throw lexer error for invalid characters", () => {
    try {
      expect(Quara.script("var a =")).toThrow();
    }
    catch (e) {}
  });

  it("should ignore several semicolons", () => {
    expect(Quara.script(";;var num = 1;;; num = 10 + 4;;;;;num;;;")).toBe(14);
  });
  it("should return undefined for empty scripts", () => {
    expect(Quara.script("")).toBe(undefined);
    expect(Quara.script(";")).toBe(undefined);
    expect(Quara.script(";;;")).toBe(undefined);
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
    const prevCount = interpreter.visitors.size;
    interpreter.registerVisitor(new ASTVisitor(interpreter));
    expect(interpreter.visitors.size).toBe(prevCount + 1);
  });

  it("should throw an error when visitor has not been registered", () => {
    const lexer = new Lexer();
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.visitors.delete("ASTBinaryOperator");
    lexer.setText("var num = 1 + 2;");
    try {
      interpreter.interpret();
    }
    catch (e) {
      expect(e.message).toBe("Visitor ASTBinaryOperator not found.");
    }
  });


  describe("Interpreter logs", () => {
    let consoleLogSpy: jest.SpyInstance;
    const lexer = new Lexer();
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser, undefined, true);

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, "log");
    });

    afterEach(() => {
      // Limpia el mock para asegurarte de que no afecta a otros tests
      consoleLogSpy.mockRestore();
    });

    test("should log", () => {
      lexer.setText("1");
      interpreter.interpret();
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "   ASTCompound", "ASTCompound");
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "     ASTNumber", "1");
    });

    test("should log a default message", () => {
      interpreter.debug();
      expect(consoleLogSpy).toHaveBeenCalledWith("-- Interpreter: ");
    });
  });
});


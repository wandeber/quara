import {Interpreter} from "../../src/Interpreter/Interpreter";
import {Lexer} from "../../src/Lexer/Lexer";
import {Parser} from "../../src/Parser";
import {Quara} from "../../src/Quara";

describe("Interpreter", () => {
  it("Should throw a syntax error", () => {
    expect(() => Quara.scriptSync("1 + 2 +")).toThrow();
  });

  it("should throw lexer error for invalid characters", () => {
    expect(() => Quara.scriptSync("¿")).toThrow();
  });

  it("should throw lexer error for invalid characters", () => {
    expect(() => Quara.scriptSync("var a =")).toThrow();
  });

  it("should ignore several semicolons", () => {
    expect(Quara.scriptSync(";;var num = 1;;; num = 10 + 4;;;;;num;;;")).toBe(14);
  });
  it("should return undefined for empty scripts", () => {
    expect(Quara.scriptSync("")).toBe(undefined);
    expect(Quara.scriptSync(";")).toBe(undefined);
    expect(Quara.scriptSync(";;;")).toBe(undefined);
  });

  it("Variables should be added", () => {
    const lexer = new Lexer();
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    interpreter.setVariables({prop1: 1, prop2: 2});
    interpreter.setVariables({prop3: 3, prop2: 4});
    expect(interpreter.globalScope.getValue("prop2")).toBe(4);
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

    it("should log", () => {
      lexer.setText("1");
      interpreter.process();
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "   Compound", "Compound");
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "     Num", "1");
    });

    it("should log a default message", () => {
      interpreter.debug();
      expect(consoleLogSpy).toHaveBeenCalledWith("-- Interpreter: ");
    });
  });
});

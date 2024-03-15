import {expect, describe, it, beforeEach, afterEach, spyOn, Mock} from "bun:test";
import Interpreter from "../../src/Interpreter/Interpreter";
import Lexer from "../../src/Lexer/Lexer";
import Parser from "../../src/Parser";
import Quara from "../../src/Quara";

describe("Interpreter", () => {
  it("Should throw a syntax error", () => {
    try {
      expect(Quara.scriptSync("1 + 2 +")).toThrow();
    }
    catch (e) {}
  });

  it("should throw lexer error for invalid characters", () => {
    try {
      expect(Quara.scriptSync("¿")).toThrow();
    }
    catch (e) {}
  });

  it("should throw lexer error for invalid characters", () => {
    try {
      expect(Quara.scriptSync("var a =")).toThrow();
    }
    catch (e) {}
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
    interpreter.globalScope = {};
    interpreter.setVariables({prop1: 1, prop2: 2});
    interpreter.setVariables({prop3: 3, prop2: 4});
    console.log(interpreter.globalScope);
    expect(interpreter.globalScope).toStrictEqual({prop1: 1, prop2: 4, prop3: 3});
  });

  describe("Interpreter logs", () => {
    let consoleLogSpy: Mock<typeof console.log>;
    const lexer = new Lexer();
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser, undefined, true);

    beforeEach(() => {
      consoleLogSpy = spyOn(console, "log");
    });

    afterEach(() => {
      // Limpia el mock para asegurarte de que no afecta a otros tests
      consoleLogSpy.mockRestore();
    });

    it("should log", () => {
      lexer.setText("1");
      interpreter.interpret();
      expect(consoleLogSpy.mock.calls[0]).toEqual(["   ASTCompound", "ASTCompound"]);
      expect(consoleLogSpy.mock.calls[1]).toEqual(["     ASTNumber", "1"]);
    });

    it("should log a default message", () => {
      interpreter.debug();
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy.mock.calls[0]).toEqual(["-- Interpreter: "]);
    });
  });
});

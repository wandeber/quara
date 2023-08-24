import Interpreter from "./Interpreter/Interpreter";
import Lexer from "./Lexer/Lexer";
import Parser from "./Parser";





/**
 * Based on the programming language Quara (Query as Sara).
 * @author Bernardo A. Siverio (wandeber)
 */
export default class Quara {
  lexer: Lexer;

  parser: Parser;

  interpreter: Interpreter;

  constructor(text: string, globalVariables: any = {}, debug = false) {
    this.lexer = new Lexer(text);
    this.parser = new Parser(this.lexer);
    this.interpreter = new Interpreter(this.parser, globalVariables, debug);
  }

  run() {
    return this.interpreter.interpret();
  }
}

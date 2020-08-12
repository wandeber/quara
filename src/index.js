"use strict";

const {Lexer} = require("./Lexer/Lexer");
const {Parser} = require("./Parser");
const {Interpreter} = require('./Interpreters/Interpreter');





/**
 * Based on the programming language Quara (Query as Sara).
 * @author Bernardo A. Siverio (wandeber)
 */
class Quara {
  constructor(text, globalVariables) {
    this.lexer = new Lexer(text);
    this.parser = new Parser(this.lexer);
    this.interpreter = new Interpreter(this.parser, globalVariables);
  }

  run() {
    return this.interpreter.interpret();
  }
}



module.exports = {Quara};

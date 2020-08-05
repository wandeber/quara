"use strict";

const Readline = require("readline");

const {Lexer} = require("./pascal/Lexer");
const {Parser} = require("./pascal/Parser");
const {Interpreter} = require('./pascal/Interpreters/Interpreter');
//const {RPNTranslator} = require('./pascal/Interpreters/RPNTranslator');
//const {LispTranslator} = require('./pascal/Interpreters/LispTranslator');
//const {SQLTranslator} = require('./pascal/Interpreters/SQLTranslator');
//const {ASTInterpreter} = require('./pascal/Interpreters/ASTInterpreter');





/**
 * Update:
 * - Support expressions with several operations: 5 + 6 - 2 ...
 * - Support expressions with operators * and /. They have precedence over + and -.
 * - Support parenthesis.
 * - Support decimal numbers.
 * - Support unary operator + and -.
 * - Support logic operators (!, !=, <, >, <=, >=, &&, ||).
 * 
 * @author wandeber
 * @see https://ruslanspivak.com/lsbasi-part1/ Implemented following Ruslan's guide.
 */
(() => {
  function head() {
    console.log("  Pascal interpreter.\n");
  }

  function close() {
    console.log(
      "\n"
      +"  Bye!"
      +"\n"
    );
    process.exit();
  }
  
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
  });


  
  const commands = {
    close: () => {
      rl.close();
    },
  };
  commands.bye = commands.close;
  commands.exit = commands.close;
  
  let result;
  function prompt() {
    rl.question("> ", (input) => {
      if (typeof commands[input] == "function") {
        commands[input]();
      }
      else {
        try {
          if (typeof input === "string") {
            input = input.trim();
            if (input.length > 0) {
              const lexer = new Lexer(input);
              const parser = new Parser(lexer);
    
              //const interpreter = new RPNTranslator(parser);
              //const interpreter = new LispTranslator(parser);
              //const interpreter = new SQLTranslator(parser);
              //const interpreter = new ASTInterpreter(parser);
              const interpreter = new Interpreter(parser);
              
              result = interpreter.interpret();
              if (result) {
                console.log(result);
              }
            }
          }
        }
        catch (error) {
          console.log("Error: ", error);
          console.log("\n");
        }
      }
      
      prompt();
    });
  }
  


  rl.on("close", close);
  head();
  prompt();
})();
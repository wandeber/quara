"use strict";

const Readline = require("readline");
const Interpreter = require('./src/Interpreter');
const Lexer = require("./src/Lexer");





/**
 * Update:
 * - Support expressions with several operations: 5 + 6 - 2 ...
 * - Support expressions with operators * and /. They have precedence over + and -.
 * - Support parenthesis.
 * - Support decimal numbers.
 * 
 * @author wandeber
 * @see https://ruslanspivak.com/lsbasi-part1/ Implemented following Ruslan's guide.
 */
(() => {
  function head() {
    console.log(
       "   ___                                 \n"
      +"  / _ \\   _   _    __ _   _ __    __ _\n"
      +" | | | | | | | |  / _` | | '__|  / _` |\n"
      +" | |_| | | |_| | | (_| | | |    | (_| |\n"
      +"  \\__\\_\\  \\__,_|  \\__,_| |_|     \\__,_|\n"
      +"\n"
      +"  Query as Sara...                 v0.3\n"
      +"\n"
      +"\n"
      +"  - Supports arithmetic operations (sums, substractions, divisions, multiplications) with\n"
      +"    parenthesis and any number of spaces between members. You can use integer and decimal\n"
      +"    numbers.\n"
      +"\n"
    );
  }

  function close() {
    console.log(
      "\n"
      +"  Hope Bernito has solve your doubts. Bye!"
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
          const lexer = new Lexer(input);
          const interpreter = new Interpreter(lexer);
          result = interpreter.expr().value;
          console.log(result);
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
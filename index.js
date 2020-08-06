"use strict";

const Readline = require("readline");

const {Lexer} = require("./src/Lexer");
const {Parser} = require("./src/Parser");
const {Interpreter} = require('./src/Interpreters/Interpreter');
//const {RPNTranslator} = require('./src/Interpreters/RPNTranslator');
//const {LispTranslator} = require('./src/Interpreters/LispTranslator');
//const {MongoDBTranslator} = require('./src/Interpreters/MongoDBTranslator');
//const {BAPIFiltersTranslator} = require('./src/Interpreters/BAPIFiltersTranslator');
//const {ASTInterpreter} = require('./src/Interpreters/ASTInterpreter');





/**
 * TODO: Quara debe soportar alguna forma de definir strings en varias líneas.
 *   Permitirá hacer que el texto se alinee en espacios en funcion de la primera línea.
 * 
 * Update:
 * - Support expressions with several operations: 5 + 6 - 2 ...
 * - Support expressions with operators * and /. They have precedence over + and -.
 * - Support parenthesis.
 * - Support decimal numbers.
 * - Support unary operator + and -.
 * - Support logic operators (!, !=, <, >, <=, >=, &&, ||).
 * - Support pow (^) and sqrt (¬/) operators. 
 * - Support assign operators (=, +=, -=, *=, /=, %=, ^=).
 * - Support strings.
 * - Variables and reserved keywords.
 * 
 * @author wandeber
 * @see https://ruslanspivak.com/lsbasi-part1/ Implemented following Ruslan's guide.
 */
(() => {
  function devStatus() {
    console.log( 
       "  - Supported comments:\n"
      +"      - Line comments: // ...\n"
      +"      - Block comments: /* ... */\n"
      +"  - Supported operators:\n"
      +"      +, -, *, /, %, ^, ¬/\n"
      +"      =, +=, -=, *=, /=, %=, ^=\n"
      +"      !, ==, !=, ~=, !~=, <>, <, >, <=, >=, &&, ||\n"
      +"      $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or\n"
      +"      (, )\n"
      +"  - Supported types:\n"
      +"      - Booleans.\n"
      +"      - Integer and decimal numbers.\n"
      +"      - Strings.\n"
      +"  - Variables and reserved keywords.\n"
      +"  - Reserved valid names:\n"
      +"      $not, $eq, $ne, $leq, $lne, $lt, $gt, $lte, $gte, $and, $or\n"
      +"      true, false\n"
      +"\n"
    );
  }
  
  function info() {
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
    );

    devStatus();
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
  commands.info = info;
  
  let result;
  function prompt() {
    let text = "";
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
              //const interpreter = new MongoDBTranslator(parser);
              //const interpreter = new BAPIFiltersTranslator(parser);
              //const interpreter = new ASTInterpreter(parser);
              const interpreter = new Interpreter(parser);
              
              result = interpreter.interpret();
              switch (typeof result) {
                case 'string':
                  console.log('"'+ result +'"');
                  break;
                case 'object':
                  console.log(JSON.stringify(result, null, 2));
                  break;
                default:
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
  info();
  prompt();
})();
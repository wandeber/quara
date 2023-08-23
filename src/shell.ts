import Interpreter from "./Interpreter/Interpreter";
import Lexer from "./Lexer/Lexer";
import Parser from "./Parser";
import ReadLine from "readline";
//const {RPNTranslator} = require('./Interpreters/RPNTranslator');
//const {LispTranslator} = require('./Interpreters/LispTranslator');
//const {MongoDBTranslator} = require('./Interpreters/MongoDBTranslator');
//const {BAPIFiltersTranslator} = require('./Interpreters/BAPIFiltersTranslator');
//const {ASTInterpreter} = require('./Interpreters/ASTInterpreter');





/**
 * TODO: Quara debe soportar alguna forma de definir strings en varias líneas.
 *   Permitirá hacer que el texto se alinee en espacios en función de la primera línea.
 * TODO: Aceptar multiplicaciones tipo: 2a b c, que serán interpretadas como 2 * a * b * c.
 * TODO: Error al asignar un valor de tipo incorrecto a una variable tipada.
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
  const devStatus = () => {
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
  };
  
  const info = () => {
    console.log(
       "   ___                                 \n"
      +"  / _ \\   _   _    __ _   _ __    __ _\n"
      +" | | | | | | | |  / _` | | '__|  / _` |\n"
      +" | |_| | | |_| | | (_| | | |    | (_| |\n"
      +"  \\__\\_\\  \\__,_|  \\__,_| |_|     \\__,_|\n"
      +"\n"
      +"  Query as Sara...               v0.5.1\n"
      +"\n"
      +"\n"
    );

    devStatus();
  };

  const close = () => {
    console.log(
      "\n"
      +"  Hope Bernito has solve your doubts. Bye!"
      +"\n"
    );
  };

  const JSONIndentationSpaces = 2;

  
  const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
  });


  const commandClose = () => {
    rl.close();
  };
  const commands: Map<string, any> = new Map([
    ["bye", commandClose],
    ["exit", commandClose],
    ["info", info]
  ]);
  
  let result;
  const lexer = new Lexer();
  const parser = new Parser(lexer);
  const interpreter = new Interpreter(parser);
  //const interpreter = new RPNTranslator(parser);
  //const interpreter = new LispTranslator(parser);
  //const interpreter = new MongoDBTranslator(parser);
  //const interpreter = new BAPIFiltersTranslator(parser);
  //const interpreter = new ASTInterpreter(parser);
  
  const prompt = () => {
    rl.question("> ", (input: any) => {
      if (typeof commands.get(input) == "function") {
        commands.get(input)();
      }
      else {
        try {
          if (typeof input === "string" && input.length > 0) {
            lexer.setText(input);
            result = interpreter.interpret();
            switch (typeof result) {
              case "string":
                console.log("\""+ result +"\"");
                break;
              case "object":
                console.log(JSON.stringify(result, null, JSONIndentationSpaces));
                break;
              default:
                console.log(result);
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
  };
  


  rl.on("close", close);
  info();
  prompt();
})();

import {Lexer, Parser, Interpreter} from "./Quara.js";
import ReadLine from "readline";
import info from "../package.json" with {type: "json"};

const version = info.version;



/**
 * TODO: Type checking when assigning a variable.
 * TODO: In text processor mode, the interpreter should not print the result of the last expression.
 *
 * @author wandeber
 * Thanks to Ruslan Spivak for his guide.
 * @see https://ruslanspivak.com/lsbasi-part1/
 */
(() => {
  const info = () => {
    console.log(
      "   ___\n"
      +"  / _ \\   _   _    __ _   _ __    __ _\n"
      +" | | | | | | | |  / _` | | '__|  / _` |\n"
      +" | |_| | | |_| | | (_| | | |    | (_| |\n"
      +"  \\__\\_\\  \\__,_|  \\__,_| |_|     \\__,_|\n"
      +"\n"
      +`  Query as Sara...              v${version}\n`
      +"\n",
    );
  };

  const close = () => {
    console.log(
      "\n"
      +"  Hope Bernito has solve your doubts. Bye!"
      +"\n",
    );
  };

  const JSONIndentationSpaces = 2;

  const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  const commandClose = () => {
    rl.close();
    process.exit(0);
  };
  const commands: Map<string, any> = new Map([
    ["bye", commandClose],
    ["exit", commandClose],
    ["info", info],
  ]);


  // Al inicio de tu script
  const args = process.argv.slice(2);
  const isDebugInterpreter = args.includes("--debug-interpreter");

  let result;
  const lexer = new Lexer();
  const parser = new Parser(lexer);
  const interpreter = new Interpreter(parser, undefined, isDebugInterpreter);

  const prompt = () => {
    rl.question("> ", (input: any) => {
      if (typeof commands.get(input) == "function") {
        commands.get(input)();
      }
      else {
        try {
          if (typeof input === "string" && input.length > 0) {
            lexer.setText(input);
            result = interpreter.process();
            switch (typeof result) {
            case "string":
              console.log("\""+ result +"\"");
              break;
            case "object":
              console.log(JSON.stringify(result, null, JSONIndentationSpaces));
              break;
            case "undefined":
              // console.log("null");
              break;
            default:
              if (result == Infinity) {
                console.log("∞");
              }
              else if (result == -Infinity) {
                console.log("-∞");
              }
              else if (result == null || Number.isNaN(result)) {
                // console.log("null");
              }
              else {
                console.log(result);
              }
            }
          }
        }
        catch (error) {
          console.log(error);
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

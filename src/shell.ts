import Interpreter from "./Interpreter/Interpreter";
import Lexer from "./Lexer/Lexer";
import Parser from "./Parser";
import ReadLine from "readline";





/**
 * TODO: Error al asignar un valor de tipo incorrecto a una variable tipada.
 *
 * @author wandeber
 * Thanks to Ruslan Spivak for his guide.
 * @see https://ruslanspivak.com/lsbasi-part1/
 */
(() => {
  const info = () => {
    console.log(
      "   ___                                 \n"
      +"  / _ \\   _   _    __ _   _ __    __ _\n"
      +" | | | | | | | |  / _` | | '__|  / _` |\n"
      +" | |_| | | |_| | | (_| | | |    | (_| |\n"
      +"  \\__\\_\\  \\__,_|  \\__,_| |_|     \\__,_|\n"
      +"\n"
      +"  Query as Sara...               v0.8.0\n"
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
  const interpreter = new Interpreter(parser, null, isDebugInterpreter);

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

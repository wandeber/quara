import {Lexer} from "./Lexer/Lexer";
import {Parser} from "./Parser";
import {Interpreter} from "./Interpreter/Interpreter";
import fs from "fs";



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
    return this.interpreter.process();
  }


  static scriptSync(text: string, globalVariables: any = {}, debug = false) {
    const quara = new Quara(text, globalVariables, debug);
    return quara.run();
  }

  static textSync(text: string, globalVariables: any = {}, debug = false) {
    return Quara.scriptSync("`"+ text +"`", globalVariables, debug);
  }


  static async script(text: string, globalVariables: any = {}, debug = false) {
    return Quara.scriptSync(text, globalVariables, debug);
  }

  static async text(text: string, globalVariables: any = {}, debug = false) {
    return Quara.textSync(text, globalVariables, debug);
  }


  static fileSync(path: string, globalVariables: any = {}, debug = false) {
    // Get file extension:
    const extension = path.split(".")?.pop() || "";
    if (!["quara", "qra", "qtml"].includes(extension)) {
      throw new Error("File extension not supported.");
    }

    // Read file text content:
    let content = fs.readFileSync(path, {encoding: "utf-8"});

    if (extension === "qtml" || extension === "qstr") {
      // content = "`" + content + "`";
      return Quara.textSync(content, globalVariables, debug);
    }

    return Quara.scriptSync(content, globalVariables, debug);
  }

  static async file(path: string, globalVariables: any = {}, debug = false) {
    return Quara.fileSync(path, globalVariables, debug);
  }
}


export {Quara, Lexer, Parser, Interpreter};

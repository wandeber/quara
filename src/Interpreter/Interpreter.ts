import ASTBooleanVisitor from "./ASTBooleanVisitor";
import ASTNumberVisitor from "./ASTNumberVisitor";
import ASTStringVisitor from "./ASTStringVisitor";
import ASTUnaryOperatorVisitor from "./ASTUnaryOperatorVisitor";
import Parser from "../Parser";
import ASTBinaryOperatorVisitor from "./ASTBinaryOperatorVisitor";
import ASTFunctionCallVisitor from "./ASTFunctionCallVisitor";
import ASTAssignVisitor from "./ASTAssignVisitor";
import ASTVariableVisitor from "./ASTVariableVisitor";
import ASTTypeVisitor from "./ASTTypeVisitor";
import ASTVariableDeclarationVisitor from "./ASTVariableDeclarationVisitor";
import ASTConstantDeclarationVisitor from "./ASTConstantDeclarationVisitor";
import ASTCompoundVisitor from "./ASTCompoundVisitor";
import AST from "../ASTNodes/AST";
import ASTInterpreter from "./ASTInterpreter";
import ASTCharVisitor from "./ASTCharVisitor";
import ASTIfVisitor from "./ASTIfVisitor";
import ASTWhileVisitor from "./ASTWhileVisitor";
import ASTAssign from "../ASTNodes/ASTAssign";
import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTBoolean from "../ASTNodes/ASTBoolean";
import ASTChar from "../ASTNodes/ASTChar";
import ASTCompound from "../ASTNodes/ASTCompound";
import ASTConstantDeclaration from "../ASTNodes/ASTConstantDeclaration";
import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
import ASTIf from "../ASTNodes/ASTIf";
import ASTNumber from "../ASTNodes/ASTNumber";
import ASTString from "../ASTNodes/ASTString";
import ASTType from "../ASTNodes/ASTType";
import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVariable from "../ASTNodes/ASTVariable";
import ASTVariableDeclaration from "../ASTNodes/ASTVariableDeclaration";
import ASTWhile from "../ASTNodes/ASTWhile";
import ASTTextBlock from "../ASTNodes/ASTTextBlock";
import ASTTextProcessor from "../ASTNodes/ASTTextProcessor";
import ASTTextBlockVisitor from "./ASTTextBlockVisitor";
import ASTTextProcessorVisitor from "./ASTTextProcessorVisitor";
import {IVisitorResult} from "./VisitorResult";
import ASTArray from "../ASTNodes/ASTArray";
import ASTArrayVisitor from "./ASTArrayVisitor";
import ASTObject from "../ASTNodes/ASTObject";
import ASTObjectVisitor from "./ASTObjectVisitor";


const Documentation = new Map();

const DefaultVariables = {
  contains(arr: string|any[], ...args: [any, any]) {
    return arr.includes(...args);
  },
  isNaN(num: number) {
    return Number.isNaN(num);
  },

  // String:
  length(str: string) {
    return str.length;
  },
  split(str: string, separator: string) {
    return str.split(separator);
  },
  join(arr: (string|number)[], separator: string = "") {
    return arr.join(separator);
  },
  upperCase(str: string) {
    return str.toUpperCase();
  },
  lowerCase(str: string) {
    return str.toLowerCase();
  },

  // Math:
  abs(num: number): number {
    return Math.abs(num);
  },
  ceil(num: number, decimals = 0) {
    return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
  floor(num: number, decimals = 0) {
    return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
  round(num: number, decimals = 0) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
  trunc(num: number, decimals = 0) {
    return Math.trunc(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
  max(...args: number[]) {
    return Math.max(...args);
  },
  min(...args: number[]) {
    return Math.min(...args);
  },
  fixed(num: number, ...args: any[]) {
    return num.toFixed(...args);
  },

  // Types:
  isNumber(num: any) {
    return typeof num === "number";
  },
  isDecimal(num: any) {
    return !Number.isInteger(num) && !Number.isNaN(num);
  },
  isInteger(num: any) {
    return Number.isInteger(num);
  },
  isString(str: any) {
    return typeof str === "string";
  },
  isBoolean(bool: any) {
    return typeof bool === "boolean";
  },
  isObject(obj: any) {
    return typeof obj === "object" && !Array.isArray(obj);
  },
  isArray(arr: any) {
    return Array.isArray(arr);
  },

  help(ptr: any) {
    let text = ptr ? Documentation.get(ptr) : Documentation.get(DefaultVariables.help);
    console.log(text);
  },

  log(arg: any) {
    console.log(arg);
  },

  print(arg: any) {
    return arg;
  },

  hi() {
    console.log("Hello, world!");
    return "Hello, world!";
  },
};

Documentation.set(
  DefaultVariables.contains,
  "contains(arr: string|any[], ...args: [any, any]): boolean\n  Returns true if the array contains the element.",
);
Documentation.set(
  DefaultVariables.isNaN,
  "isNaN(num: number): boolean\n  Returns true if the argument is NaN.",
);

Documentation.set(
  DefaultVariables.length,
  "length(str: string): number\n  Returns the length of a string.",
);
Documentation.set(
  DefaultVariables.split,
  "split(str: string, separator: string): string[]\n  Splits a string into an array of substrings.",
);
Documentation.set(
  DefaultVariables.join,
  "join(arr: (string|number)[], separator = ''): string\n  Joins all elements of an array into a string.",
);
Documentation.set(
  DefaultVariables.upperCase,
  "upperCase(str: string): string\n  Converts a string to uppercase.",
);
Documentation.set(
  DefaultVariables.lowerCase,
  "lowerCase(str: string): string\n  Converts a string to lowercase.",
);

Documentation.set(DefaultVariables.abs, "abs(num: number): number\n  Returns the absolute value of a number.");
Documentation.set(
  DefaultVariables.ceil,
  "ceil(num: number, decimals = 0): number\n  Returns the smallest integer greater than or equal to a number.",
);
Documentation.set(
  DefaultVariables.floor,
  "floor(num: number, decimals = 0): number\n  Returns the largest integer less than or equal to a number.",
);
Documentation.set(
  DefaultVariables.round,
  "round(num: number, decimals = 0): number\n  Returns the value of a number rounded to the nearest integer.",
);
Documentation.set(
  DefaultVariables.trunc,
  "trunc(num: number, decimals = 0): number\n  Returns the integer part of a number by removing any fractional digits.",
);
Documentation.set(
  DefaultVariables.max,
  "max(...args: number[]): number\n  Returns the largest of zero or more numbers.",
);
Documentation.set(
  DefaultVariables.min,
  "min(...args: number[]): number\n  Returns the smallest of zero or more numbers.",
);
Documentation.set(
  DefaultVariables.fixed,
  "fixed(num: number, ...args: any[]): string\n  Formats a number using fixed-point notation.",
);
Documentation.set(
  DefaultVariables.isNumber,
  "isNumber(num: any): boolean\n  Returns true if the argument is a number.",
);
Documentation.set(
  DefaultVariables.isDecimal,
  "isDecimal(num: any): boolean\n  Returns true if the argument is a decimal number.",
);
Documentation.set(
  DefaultVariables.isInteger,
  "isInteger(num: any): boolean\n  Returns true if the argument is an integer number.",
);
Documentation.set(
  DefaultVariables.isString,
  "isString(str: any): boolean\n  Returns true if the argument is a string.",
);
Documentation.set(
  DefaultVariables.isBoolean,
  "isBoolean(bool: any): boolean\n  Returns true if the argument is a boolean.",
);
Documentation.set(
  DefaultVariables.isObject,
  "isObject(obj: any): boolean\n  Returns true if the argument is an object.",
);
Documentation.set(
  DefaultVariables.isArray,
  "isArray(arr: any): boolean\n  Returns true if the argument is an array.",
);
Documentation.set(
  DefaultVariables.help,
  "help(ptr: any): void\n  Shows the documentation of a function.",
);
Documentation.set(
  DefaultVariables.log,
  "log(arg: any): void\n  Logs a message to the console.",
);
Documentation.set(
  DefaultVariables.print,
  "print(arg: any): any\n  Prints the argument.",
);

export default class Interpreter extends ASTInterpreter {
  parser: Parser;

  showDebug: boolean;
  space: string = "";

  /**
   * Will be set to visitWithDebug or visitWithoutDebug depending on the value of showDebug.
   * @param {AST} node
   * @return {any}
   */
  visit: (node: AST) => IVisitorResult;

  /**
   * AST Interpreter.
   * @param {Parser} parser
   * @param {any} [variables = {}]
   * @param {Boolean} [showDebug = false]
   */
  constructor(parser: Parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;

    this.showDebug = showDebug;
    if (this.showDebug) {
      this.debug("Debug is enabled.");
      this.visit = this.visitWithDebug;
    }
    else {
      this.visit = this.visitWithoutDebug;
    }

    this.setVariables(DefaultVariables);
    if (variables) {
      this.setVariables(variables);
    }

    // TODO: Una opción para sacar esto de aquí es que se registren las clases Visitors después de
    //   ser definidas. Este constructor podría usar esos datos para registrar todos los visitors en
    //   bucle.
    // Por otra parte, prefiero dejarlo así por dar la posibilidad de crear diferentes interpreters
    //   con diferentes visitors.
    this.visitors[ASTAssign.name] = new ASTAssignVisitor(this);
    this.visitors[ASTBinaryOperator.name] = new ASTBinaryOperatorVisitor(this);
    this.visitors[ASTBoolean.name] = new ASTBooleanVisitor(this);
    this.visitors[ASTChar.name] = new ASTCharVisitor(this);
    this.visitors[ASTCompound.name] = new ASTCompoundVisitor(this);
    this.visitors[ASTConstantDeclaration.name] = new ASTConstantDeclarationVisitor(this);
    this.visitors[ASTFunctionCall.name] = new ASTFunctionCallVisitor(this);
    this.visitors[ASTNumber.name] = new ASTNumberVisitor(this);
    this.visitors[ASTString.name] = new ASTStringVisitor(this);
    this.visitors[ASTType.name] = new ASTTypeVisitor(this);
    this.visitors[ASTUnaryOperator.name] = new ASTUnaryOperatorVisitor(this);
    this.visitors[ASTVariableDeclaration.name] = new ASTVariableDeclarationVisitor(this);
    this.visitors[ASTVariable.name] = new ASTVariableVisitor(this);
    this.visitors[ASTIf.name] = new ASTIfVisitor(this);
    this.visitors[ASTWhile.name] = new ASTWhileVisitor(this);
    this.visitors[ASTTextProcessor.name] = new ASTTextProcessorVisitor(this);
    this.visitors[ASTTextBlock.name] = new ASTTextBlockVisitor(this);
    this.visitors[ASTArray.name] = new ASTArrayVisitor(this);
    this.visitors[ASTObject.name] = new ASTObjectVisitor(this);
  }

  /**
   * Add variables to the global scope.
   * @param {any} variables
   */
  setVariables(variables: any) {
    Object.assign(this.globalScope, variables);
  }

  /**
   * Visit a node without showing debug information.
   * @param {AST} node
   * @return {any}
   */
  private visitWithoutDebug(node: AST): IVisitorResult {
    let result = this.visitors[node.constructor.name].visit(node);
    // TODO: Throw an error if the visitor is undefined, null or NaN?
    if (typeof result.value === "undefined" || result.value == null) {
      result.value = undefined;
      result.output = "";
    }
    else if (Number.isNaN(result.value)) {
      result.output = "";
    }
    else if (result.value === Infinity) {
      result.output = "∞";
    }
    else if (result.value === -Infinity) {
      result.output = "-∞";
    }
    return result;
  }

  /**
   * Visit a node showing debug information.
   * @param {AST} node
   * @return {any}
   */
  private visitWithDebug(node: AST): IVisitorResult {
    let prevSpace = this.space;
    if (this.showDebug) {
      this.space += "  ";
      console.log(this.space +" "+ node.constructor.name, node.toString());
    }

    let result = this.visitWithoutDebug(node);

    if (this.showDebug) {
      this.space = prevSpace;
    }

    return result;
  }

  /**
   * Parse and interpret the code.
   * @return {any}
   */
  interpret() {
    let tree = this.parser.parse();
    // console.log(tree);
    // return tree.accept(this);
    let result = this.visit(tree);
    return result.value;
  }
}

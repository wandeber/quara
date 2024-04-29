import {Scope} from "./Interpreter/Scope";

export function getGlobalScope() {
  const GlobalScope = new Scope("global");
  Object.entries({
    contains: {
      f(arr: string|any[], ...args: [any, any]) {
        return arr.includes(...args);
      },
      d: "contains(arr: string|any[], ...args: [any, any]): boolean\n  Returns true if the array contains the element.",
    },
    isNaN: {
      f(num: number) {
        return Number.isNaN(num);
      },
      d: "isNaN(num: number): boolean\n  Returns true if the argument is NaN.",
    },

    // String:
    length: {
      f(str: string) {
        return str.length;
      },
      d: "length(str: string): number\n  Returns the length of a string.",
    },
    split: {
      f(str: string, separator: string) {
        return str.split(separator);
      },
      d: "split(str: string, separator: string): string[]\n  Splits a string into an array of substrings.",
    },
    join: {
      f(arr: (string|number)[], separator: string = "") {
        return arr.join(separator);
      },
      d: "join(arr: (string|number)[], separator = ''): string\n  Joins all elements of an array into a string.",
    },
    upperCase: {
      f(str: string) {
        return str.toUpperCase();
      },
      d: "upperCase(str: string): string\n  Converts a string to uppercase.",
    },
    lowerCase: {
      f(str: string) {
        return str.toLowerCase();
      },
      d: "lowerCase(str: string): string\n  Converts a string to lowercase.",
    },
    trim: {
      f(str: string) {
        return str.trim();
      },
      d: "",
    },

    // Math:
    abs: {
      f(num: number): number {
        return Math.abs(num);
      },
      d: "abs(num: number): number\n  Returns the absolute value of a number.",
    },
    ceil: {
      f(num: number, decimals = 0) {
        return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
      },
      d: "ceil(num: number, decimals = 0): number\n  Returns the smallest integer greater than or equal to a number.",
    },
    floor: {
      f(num: number, decimals = 0) {
        return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
      },
      d: "floor(num: number, decimals = 0): number\n  Returns the largest integer less than or equal to a number.",
    },
    round: {
      f(num: number, decimals = 0) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
      },
      d: "round(num: number, decimals = 0): number\n  Returns the value of a number rounded to the nearest integer.",
    },
    trunc: {
      f(num: number, decimals = 0) {
        return Math.trunc(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
      },
      d: "trunc(num: number, decimals = 0): number\n"
      +"  Returns the integer part of a number by removing any fractional digits.",
    },
    max: {
      f(...args: number[]) {
        return Math.max(...args);
      },
      d: "max(...args: number[]): number\n  Returns the largest of zero or more numbers.",
    },
    min: {
      f(...args: number[]) {
        return Math.min(...args);
      },
      d: "min(...args: number[]): number\n  Returns the smallest of zero or more numbers.",
    },
    fixed: {
      f(num: number, ...args: any[]) {
        return num.toFixed(...args);
      },
      d: "fixed(num: number, ...args: any[]): string\n  Formats a number using fixed-point notation.",
    },

    // Types:
    isNumber: {
      f(num: any) {
        return typeof num === "number";
      },
      d: "isNumber(num: any): boolean\n  Returns true if the argument is a number.",
    },
    isDecimal: {
      f(num: any) {
        return !Number.isInteger(num) && !Number.isNaN(num);
      },
      d: "isDecimal(num: any): boolean\n  Returns true if the argument is a decimal number.",
    },
    isInteger: {
      f(num: any) {
        return Number.isInteger(num);
      },
      d: "isInteger(num: any): boolean\n  Returns true if the argument is an integer number.",
    },
    isString: {
      f(str: any) {
        return typeof str === "string";
      },
      d: "isString(str: any): boolean\n  Returns true if the argument is a string.",
    },
    isBoolean: {
      f(bool: any) {
        return typeof bool === "boolean";
      },
      d: "isBoolean(bool: any): boolean\n  Returns true if the argument is a boolean.",
    },
    isObject: {
      f(obj: any) {
        return typeof obj === "object" && !Array.isArray(obj);
      },
      d: "isObject(obj: any): boolean\n  Returns true if the argument is an object.",
    },
    isArray: {
      f(arr: any) {
        return Array.isArray(arr);
      },
      d: "isArray(arr: any): boolean\n  Returns true if the argument is an array.",
    },

    help: {
      f(name: string) {
        if (!name) {
          name = "help";
        }
        let text = GlobalScope.getDoc(name);
        console.log(text);
        return text;
      },
      d: "help(name: string): void\n  Shows the documentation of a function.",
    },

    log: {
      f(arg: any) {
        console.log(arg);
      },
      d: "log(arg: any): void\n  Logs a message to the console.",
    },

    print: {
      f(arg: any) {
        return arg;
      },
      d: "print(arg: any): any\n  Prints the argument.",
    },

    hi: {
      f() {
        console.log("Hello, world!");
        return "Hello, world!";
      },
      d: "",
    },
  }).forEach(([name, {f, d}]: any) => {
    GlobalScope.insert(name, f, d);
  });
  return GlobalScope;
}

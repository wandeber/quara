export const Documentation = new Map();

export const DV = {
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
  trim(str: string) {
    return str.trim();
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
    let text = ptr ? Documentation.get(ptr) : Documentation.get(DV.help);
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

export {DV as DefaultVariables};


[
  [
    DV.contains,
    "contains(arr: string|any[], ...args: [any, any]): boolean\n  Returns true if the array contains the element.",
  ],
  [
    DV.isNaN,
    "isNaN(num: number): boolean\n  Returns true if the argument is NaN.",
  ],
  [
    DV.length,
    "length(str: string): number\n  Returns the length of a string.",
  ],
  [
    DV.split,
    "split(str: string, separator: string): string[]\n  Splits a string into an array of substrings.",
  ],
  [
    DV.join,
    "join(arr: (string|number)[], separator = ''): string\n  Joins all elements of an array into a string.",
  ],
  [
    DV.upperCase,
    "upperCase(str: string): string\n  Converts a string to uppercase.",
  ],
  [
    DV.lowerCase,
    "lowerCase(str: string): string\n  Converts a string to lowercase.",
  ],
  [
    DV.abs,
    "abs(num: number): number\n  Returns the absolute value of a number.",
  ],
  [
    DV.ceil,
    "ceil(num: number, decimals = 0): number\n  Returns the smallest integer greater than or equal to a number.",
  ],
  [
    DV.floor,
    "floor(num: number, decimals = 0): number\n  Returns the largest integer less than or equal to a number.",
  ],
  [
    DV.round,
    "round(num: number, decimals = 0): number\n  Returns the value of a number rounded to the nearest integer.",
  ],
  [
    DV.trunc,
    "trunc(num: number, decimals = 0): number\n"
    +"  Returns the integer part of a number by removing any fractional digits.",
  ],
  [
    DV.max,
    "max(...args: number[]): number\n  Returns the largest of zero or more numbers.",
  ],
  [
    DV.min,
    "min(...args: number[]): number\n  Returns the smallest of zero or more numbers.",
  ],
  [
    DV.fixed,
    "fixed(num: number, ...args: any[]): string\n  Formats a number using fixed-point notation.",
  ],
  [
    DV.isNumber,
    "isNumber(num: any): boolean\n  Returns true if the argument is a number.",
  ],
  [
    DV.isDecimal,
    "isDecimal(num: any): boolean\n  Returns true if the argument is a decimal number.",
  ],
  [
    DV.isInteger,
    "isInteger(num: any): boolean\n  Returns true if the argument is an integer number.",
  ],
  [
    DV.isString,
    "isString(str: any): boolean\n  Returns true if the argument is a string.",
  ],
  [
    DV.isBoolean,
    "isBoolean(bool: any): boolean\n  Returns true if the argument is a boolean.",
  ],
  [
    DV.isObject,
    "isObject(obj: any): boolean\n  Returns true if the argument is an object.",
  ],
  [
    DV.isArray,
    "isArray(arr: any): boolean\n  Returns true if the argument is an array.",
  ],
  [
    DV.help,
    "help(ptr: any): void\n  Shows the documentation of a function.",
  ],
  [
    DV.log,
    "log(arg: any): void\n  Logs a message to the console.",
  ],
  [
    DV.print,
    "print(arg: any): any\n  Prints the argument.",
  ],
].forEach(([k, v]) => Documentation.set(k, v));

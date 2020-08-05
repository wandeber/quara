"use strict";

const ReadlineSync = require("readline-sync");
const Interpreter = require('./Interpreter');



function rawInput(message) {
  return ReadlineSync.question(message);
}


/**
 * Adaptado de https://ruslanspivak.com/lsbasi-part1/
 */
(() => {
  console.log("Sum interpreter");
  while (true) {
    let text;

    

    try {
      // To run under Python3 replace 'raw_input' call with 'input'
      text = rawInput("calc > ");
    }
    catch (error) {
      console.log("Error", error);
      break;
    }

    if (typeof text !== "string") {
      continue;
    }

    const interpreter = new Interpreter(text);
    const result = interpreter.expr();
    console.log(result);
  }
})();
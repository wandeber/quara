"use strict";

const {Token, TokenTypes} = require("../Token");
const {Types} = require("../../helpers/BLib.js");
const {ReservedKeywords} = require("./ReservedKeywords");
const {Operators} = require("./Operators");
const {Validation} = require("./Validation");





/*
int holaMundo(string algo, integer algo) {}
its internal name will be "holaMundo(string, integer)"

int (string algo, integer algo) => {}
[type] [name] ([ [type] <name>[, [type] <name>] ]) [=>] {}


Permitir "2a" -> "a" es un nombre de variable. Se interpretará como "(2 * a)".
Permitir "2a b c" -> "a", "b" y "c" son nombres de variable. Se interpretará como "(2 * a * b * c)".
3 * 2a b -> 3 * (2 * a * b)
*/

/**
 * Related definitions:
 * - Token: An object that has a type and a value. For example, +, -, * ans / are different tokens
 *   of type Operator.
 * - Lexical anlysis: The process of breaking the input string into tokens.
 * - Lexical analyzer, tokenizer, lexer, scanner: The part of the interpreter that does the lexical
 *   analysis.
 * - Lexeme: A sequence of characters that form a token.
 */
class Lexer {
  constructor(text) {
    this.text = text;
    this.pos = 0;
    this.currentToken = null; // Not needed in Lexer.
    this.currentChar = null;
    this.getCurrentChar();
    this.showDebug = false;
  }



  error(message, me) {
    if (message) {
      console.log(message, me);
    }
    throw new Error('Invalid character');
  }

  debug(message = "") {
    if (this.showDebug) {
      console.log("-- Lexer: "+ message);
      console.log("  pos:           ", this.pos);
      console.log("  current char:  ", this.currentChar);
      //if (this.currentToken) {
      //  console.log("  current token: ", this.currentToken.value);
      //}
    }
  }



  getCurrentChar() {
    if (this.pos < this.text.length) {
      this.currentChar = this.text[this.pos];
    }
    else {
      this.currentChar = null;
    }
  }

  peek(advance = 1) {
    let peekPos = this.pos + advance;
    if (peekPos < this.text.length) {
      return this.text[peekPos];
    }
    return null;
  }

  advance(advance = 1) {
    this.pos += advance;
    this.getCurrentChar();
  }

  goToPosition(pos) {
    this.pos = pos;
    this.getCurrentChar();
  }

  skipSpaces() {
    while (this.currentChar == " ") {
      this.advance();
    }
  }

  skipLineComment() {
    this.advance(2); // Skips //,
    while (this.currentChar !== null && this.currentChar != "\n") {
      this.advance();
    }
  }
  
  skipBlockComment() {
    this.advance(2); // Skips /*.
    while (this.currentChar !== null && (this.currentChar != "*" || this.peek() != '/')) {
      this.advance();
    }
    this.advance(2); // Skips */,
  }

  getString() {
    let str = "";
    this.advance(); // Skip " opening.
    while (this.currentChar != '"') {
      str += this.currentChar;
      this.advance();
    }
    this.advance(); // Skip " closure.
    return str;
  }

  getNumber() {
    let posAtStart = this.pos;
    let number = "";
    //let dots = 0;
    while (
      this.currentChar == '.'
      || Types.isInteger(this.currentChar)
    ) {
      //if (this.currentChar == '.') {
      //  dots++;
      //}
      number += String(this.currentChar);
      this.advance();
    }

    if (!Types.isNumber(number)) {
      number = null;
      this.goToPosition(posAtStart);
    }

    return number;
  }

  /**
   * Obtiene una cambinación de los siguientes caracteres en a partir de this.text[this.pos] si
   * si coinciden con alguno de los valores de allowedValues. Para buscar, esta funcián irá
   * comparando caracter a caracter con todos los valores disponibles para descartar los que no
   * coincidan. Se da prioridad a coincidencias largas. Se intentará devolver == antes que =.
   * @param {*} allowedValues 
   */
  getCoincidence(allowedValues) {
    let currentValue = "";

    function filterValues(index, charToCheck) {
      let remainingAllowedValues = []; // Will contain only operators that match the current operator.
      
      for (let value of allowedValues) {
        if (value.length > index && charToCheck == value[index]) {
          remainingAllowedValues.push(value);
        }
      }
      
      if (remainingAllowedValues.length > 0) {
        allowedValues = remainingAllowedValues;
        return true;
      }

      return false;
    }

    /* If current character match with any value in the position it would have in case of add it
    to currentValue, adds it to currentValue and advance to the next character. */
    while (filterValues(currentValue.length, this.currentChar)) {
      currentValue += String(this.currentChar);
      this.advance();
    }
    
    return currentValue;
  }

  id() {
    let result = "";
    while (this.currentChar !== null && Validation.isValidVariableName(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    if (ReservedKeywords[result]) {
      return ReservedKeywords[result];
    }
    return new Token(TokenTypes.Id, result);
  }

  getOperator() {
    let operatorKeys = Object.keys(Operators);
    let currentOperatorKey = this.getCoincidence(operatorKeys);
    if (Operators[currentOperatorKey]) {
      return Operators[currentOperatorKey];
    }
    return null;
  }

  /**
   * Lexical analyzer (also known as scanner or tokenizer)
   *
   * This method is responsible for breaking a sentence
   * apart into tokens. One token at a time.
   */
  getNextToken(skipSpaces = true) {
    let token = null;

    /* is this.pos index past the end of the this.text ?
    if so, then return EoF token because there is no more
    input left to convert into tokens */
    if (this.currentChar === null) {
      return new Token(TokenTypes.EoF, null);
    }
    
    if (skipSpaces) {
      this.skipSpaces();
    }
    else if (this.currentChar === " ") {
      token = new Token(TokenTypes.Space, " ");
      this.advance();
      return token;
    }

    // Skip block comment:
    if (this.currentChar == '/' && this.peek() == '*') {
      this.skipBlockComment();
      return this.getNextToken(skipSpaces);
    }
    // Skip line comment:
    if (this.currentChar == '/' && this.peek() == '/') {
      this.skipLineComment();
      return this.getNextToken(skipSpaces);
    }


    // Strings:
    if (this.currentChar == '"') {
      let str = this.getString();
      if (typeof str !== "undefined") {
        return new Token(TokenTypes.StringConstant, str);
      }
    }

    /* if the character is a digit then convert it to
    integer, create a IntegerConstant token, increment this.pos
    index to point to the next character after the digit,
    and return the IntegerConstant token */
    if (this.currentChar == '.' || Types.isInteger(this.currentChar)) {
      let number = this.getNumber();
      if (number) {
        if (Types.isInteger(number)) {
          return new Token(TokenTypes.IntegerConstant, parseInt(number));
        }
        return new Token(TokenTypes.DecimalConstant, parseFloat(number));
      }
    }

    // Operators.
    let operator = this.getOperator();
    if (operator) { // Not null.
      return operator;
    }

    // Reserved keywords and variable names.
    if (Types.isAlpha(this.currentChar) || this.currentChar == '_' || this.currentChar == '$') {
      return this.id();
    }

    return this.error();
  }
}



module.exports = {Lexer};

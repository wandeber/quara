"use strict";

const {Token, TokenTypes} = require("./Token");
const {Types} = require('../helpers/BLib.js');




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

  advance() {
    this.pos++;
    this.getCurrentChar();
  }

  skipSpaces() {
    while (this.currentChar == " ") {
      this.advance();
    }
  }

  getNumber() {
    //let posAtStart = this.pos;
    let number = "";
    let dots = 0;
    while (
      this.currentChar == '.'
      || Types.isInteger(this.currentChar)
    ) {
      if (this.currentChar == '.') {
        dots++;
      }
      number += ""+ this.currentChar;
      this.advance();
    }

    if (!Types.isNumber(number)) {
      number = null;
    }

    return number;
  }

  getOperator() {
    let operators = [
      '||', '$or',
      '&&', '$and',
      '==', '!=', '<>', '$eq', '$ne',
      '<', '>', '<=', '>=', '$lt', '$gt', '$lte', '$gte',
      '+', '-',
      '*', '/', '%',
      '!', '$not',
      '++', '--',
      '(', ')',
    ];
    
    let currentOperator = "";

    function filterOperators(index, charToCheck, operators) {
      let newOperators = []; // Will contain only operators that match the current operator.
      
      for (let op of operators) {
        if (op.length > index && charToCheck == op[index]) {
          newOperators.push(op);
        }
      }
      
      if (newOperators.length > 0) {
        operators = newOperators;
        return true;
      }

      return false;
    }

    /* If current character match with any operator in the position it would have in case of add it
    to currentOperator, adds it to currentOperator and advance to the next character. */
    while (filterOperators(currentOperator.length, this.currentChar, operators)) {
      currentOperator += ""+ this.currentChar;
      this.advance();
    }
    
    if (!operators.includes(currentOperator)) {
      currentOperator = null;
    }
    
    return currentOperator;
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
    if (this.currentChar == null) {
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

    /* if the character is a digit then convert it to
    integer, create an TypeInteger token, increment this.pos
    index to point to the next character after the digit,
    and return the TypeInteger token */
    if (this.currentChar == '.' || Types.isInteger(this.currentChar)) {
      let number = this.getNumber();
      if (number) {
        if (Types.isInteger(number)) {
          return new Token(TokenTypes.TypeInteger, parseInt(number));
        }
        else {
          return new Token(TokenTypes.TypeDecimal, parseFloat(number));
        }
      }
    }

    // Operators:
    // Arithmetic operators:
    //   +, -, *, /
    // Logic operators:
    //   $eq, $ne, $lt, $gt, $lte, $gte, $and, $or
    //   ==, !=, <>, <, >, <=, >=, &&, ||
    // Other:
    //   (, )
    let operator = this.getOperator();
    if (operator) { // Not null.
      if (operator == '+') {
        return new Token(TokenTypes.OpPlus, '+');
      }
      if (operator == '-') {
        return new Token(TokenTypes.OpMinus, '-');
      }
      if (operator == '*') {
        return new Token(TokenTypes.OpMultiplication, '*');
      }
      if (operator == '/') {
        return new Token(TokenTypes.OpDivision, '/');
      }
      if (operator == '%') {
        return new Token(TokenTypes.OpModulus, '%');
      }

      if (operator == '++') {
        return new Token(TokenTypes.OpIncrement, '++');
      }
      if (operator == '--') {
        return new Token(TokenTypes.OpDecrement, '--');
      }

      if (operator == '!' || operator == '$not') {
        return new Token(TokenTypes.OpNot, '!');
      }
      if (operator == '==' || operator == '$eq') {
        return new Token(TokenTypes.OpEqual, '==');
      }
      if (operator == '!=' || operator == '<>' || operator == '$ne') {
        return new Token(TokenTypes.OpNotEqual, '!=');
      }
      if (operator == '<' || operator == '$lt') {
        return new Token(TokenTypes.OpLowerThan, '<');
      }
      if (operator == '>' || operator == '$gt') {
        return new Token(TokenTypes.OpGreaterThan, '>');
      }
      if (operator == '<=' || operator == '$lte') {
        return new Token(TokenTypes.OpLowerThanEqual, '<=');
      }
      if (operator == '>=' || operator == '$gte') {
        return new Token(TokenTypes.OpGreaterThanEqual, '>=');
      }
      if (operator == '&&' || operator == '$and') {
        return new Token(TokenTypes.OpAnd, '&&');
      }
      if (operator == '||' || operator == '$or') {
        return new Token(TokenTypes.OpOr, '||');
      }
      if (operator == '!' || operator == '$not') {
        return new Token(TokenTypes.OpNot, '!');
      }

      if (this.currentChar == '(') {
        return new Token(TokenTypes.OpParenthesisOpen, '(');
      }
      if (this.currentChar == ')') {
        return new Token(TokenTypes.OpParenthesisClose, ')');
      }
    }

    this.error();
  }
}



module.exports = {Lexer};

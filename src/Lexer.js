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

    return number;
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
      if (Types.isInteger(number)) {
        token = new Token(TokenTypes.TypeInteger, parseInt(number));
      }
      else {
        token = new Token(TokenTypes.TypeDecimal, parseFloat(number));
      }
      return token;
    }

    // Arithmetic operators:
    if (this.currentChar == '+') {
      token = new Token(TokenTypes.OpPlus, this.currentChar);
      this.advance();
      return token;
    }
    if (this.currentChar == '-') {
      token = new Token(TokenTypes.OpMinus, this.currentChar);
      this.advance();
      return token;
    }
    if (this.currentChar == '*') {
      token = new Token(TokenTypes.OpMultiplication, this.currentChar);
      this.advance();
      return token;
    }
    if (this.currentChar == '/') {
      token = new Token(TokenTypes.OpDivision, this.currentChar);
      this.advance();
      return token;
    }

    if (this.currentChar == '(') {
      token = new Token(TokenTypes.OpParenthesisOpen, this.currentChar);
      this.advance();
      return token;
    }
    if (this.currentChar == ')') {
      token = new Token(TokenTypes.OpParenthesisClose, this.currentChar);
      this.advance();
      return token;
    }

    this.error();
  }
}



module.exports = Lexer;

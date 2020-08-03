"use strict";

const {Token, TokenTypes} = require("./Token");
const {Types} = require('../helpers/BLib.js');





/**
 * Update:
 * - Support expressions with several operations: 5 + 6 - 2 ...
 * 
 * Definitions:
 * - Compiler: Translator that translates the source to machine code in order to it can be executed
 *   by a machine.
 * - Interpreter: Process directly the source code without any translation to machine code.
 * - Token: An object that has a type and a value. For example, +, -, * ans / are different tokens
 *   of type Operator.
 * - Lexical anlysis: The process of breaking the input string into tokens.
 * - Lexical analyzer, tokenizer, lexer, scanner: The part of the interpreter that does the lexical
 *   analysis.
 * - Lexeme: A sequence of characters that form a token.
 * - Parsing/Syntax analysis: The process of recognizing a phrase in the stream of tokens.
 * - Parser/Syntax analyzer: The part of the interpreter that does the parsing.
 */
class Interpreter {
  constructor(text) {
    // client string input, e.g. "3+5"
    this.text = text;
    // this.pos is an index into this.text
    this.pos = 0;
    // current token instance
    this.currentToken = null;
    this.currentChar = null;
    this.showDebug = false;

    //console.log("Texto:", this.text);
  }

  
  
  error(message, me) {
    if (message) {
      console.log(message, me);
    }
    throw new Error('Error parsing input');
  }
  
  debug(message = "") {
    if (this.showDebug) {
      console.log("-- "+ message);
      console.log("pos:           ", this.pos);
      console.log("current char:  ", this.currentChar);
      if (this.currentToken) {
        console.log("current token: ", this.currentToken.value);
      }
    }
  }


  
  skipSpaces() {
    let token = this.currentToken;
    while (token.type === TokenTypes.Space && token.type != TokenTypes.EoF) {
      //console.log("Skip space");
      token = this.getNextToken();
    }
    this.currentToken = token;
  }
  
  getNumberToken() {
    let number = "";
    let type = TokenTypes.TypeInteger;
    let someValue = false;
    let token = this.currentToken;
    while (
      token.type === TokenTypes.TypeInteger
      || token.type === TokenTypes.Dot
    ) {
      if (token.type === TokenTypes.Dot) {
        type = TokenTypes.TypeDecimal;
      }
      else {
        someValue = true;
      }
      number += ""+ token.value;
      token = this.getNextToken();
    }

    if (!someValue) {
      return this.error();
    }

    if (type == TokenTypes.TypeInteger) {
      number = parseInt(number);
    }
    else if (type == TokenTypes.TypeDecimal) {
      number = parseFloat(number);
    }
    
    if (!Types.isNumber(number)) {
      return this.error();
    }
    this.pos--;
    this.currentToken = new Token(type, number);
    return this.currentToken;
  }

  /**
   * Lexical analyzer (also known as scanner or tokenizer)
   *
   * This method is responsible for breaking a sentence
   * apart into tokens. One token at a time.
   */
  getNextToken() {
    //console.log("pos", this.pos);
    //console.log("getNextToken position "+ this.pos);
    const text = this.text;

    /* is this.pos index past the end of the this.text ?
    if so, then return EoF token because there is no more
    input left to convert into tokens */
    if (this.pos > text.length - 1) {
      return new Token(TokenTypes.EoF, null);
    }

    /* get a character at the position this.pos and decide
    what token to create based on the single character */
    this.currentChar = text[this.pos];
    //console.log("this.currentChar", this.currentChar);
    //console.log("this.currentChar is integer", Types.isInteger(this.currentChar))
    
    if (this.currentChar === " ") {
      this.pos++;
      return new Token(TokenTypes.Space, this.currentChar);
    }

    if (this.currentChar === ".") {
      this.pos++;
      return new Token(TokenTypes.Dot, this.currentChar);
    }

    /* if the character is a digit then convert it to
    integer, create an TypeInteger token, increment this.pos
    index to point to the next character after the digit,
    and return the TypeInteger token */
    if (Types.isInteger(this.currentChar)) {
      this.pos++;
      return new Token(TokenTypes.TypeInteger, parseInt(this.currentChar));
    }

    //console.log(this.currentChar);
    if (
      this.currentChar == '+'
      || this.currentChar == '-'
      || this.currentChar == '*'
      || this.currentChar == '/'
    ) {
      this.pos++;
      return new Token(TokenTypes.Operator, this.currentChar);
    }

    this.error();
  }

  eat(tokenTypes) {
    if (!Array.isArray(tokenTypes)) {
      tokenTypes = [tokenTypes];
    }

    /* compare the current token type with the passed token
    type and if they match then "eat" the current token
    and assign the next token to the this.currentToken,
    otherwise raise an exception. */
    //console.log("check if token", this.currentToken.type);
    //console.log("is in", tokenTypes);
    if (tokenTypes.includes(this.currentToken.type)) {
      //console.log("eat ok. move to next");
      this.currentToken = this.getNextToken();
    }
    else {
      //console.log("eat ko");
      this.error(this.currentToken.type +" not in ", tokenTypes);
    }
  }


  
  /**
   * expr -> TypeInteger OpPlus TypeInteger
   */
  expr() {
    this.debug("Start");
    // set current token to the first token taken from the input
    this.currentToken = this.getNextToken();
    // Skip spaces (left of expression):
    this.debug("Skip spaces");
    this.skipSpaces();
    this.debug("Get first number");
    // we expect the current token to be a single-digit integer
    let left = this.getNumberToken();
    //console.log("left", left);
    this.eat([TokenTypes.TypeInteger, TokenTypes.TypeDecimal]);
    //let left = this.currentToken;

    // Skip spaces (after first operand):
    this.debug("Skip spaces");
    this.skipSpaces();
    this.debug("Get operator");

    // we expect the current token to be an Operator token
    
    let op = this.currentToken;
    //console.log("op "+ op.value +" - "+ this.pos, this.currentChar);
    this.eat(TokenTypes.Operator);
    
    // Skip spaces (after operator):
    this.debug("Skip spaces");
    this.skipSpaces();
    this.debug("Get second number");
    
    // we expect the current token to be a single-digit integer
    let right = this.getNumberToken();
    this.eat([TokenTypes.TypeInteger, TokenTypes.TypeDecimal]);
    //console.log("right", right);
    //let right = this.currentToken;

    // Skip spaces (after operator):
    this.skipSpaces();

    // after the above call the this.current_token is set to EoF token.

    /* at this point TypeInteger OpPlus TypeInteger sequence of tokens
    has been successfully found and the method can just
    return the result of adding two integers, thus
    effectively interpreting client input */
    
    let result;
    switch (op.value) {
      case "+":
        result = left.value + right.value;
        break;
      case "-":
        result = left.value - right.value;
        break;
      case "*":
        result = left.value * right.value;
        break;
      case "/":
        if (right.value == 0)
          result = NaN;
        else 
          result = left.value / right.value;
        break;
    }
    return result
  }
}



module.exports = Interpreter;
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
 * 
 * Guidelines to code a grammar:
 * - Each rule, R, defined in the grammar, becomes a method with the same name, and references to
 *   that rule become a method call: R(). The body of the method follows the flow of the body of the
 *   rule using the very same guidelines.
 * - Alternatives (a1 | a2 | aN) become an if-elif-else statement
 * - An optional grouping (…)* becomes a while statement that can loop over zero or more times
 * - Each token reference T becomes a call to the method eat: eat(T). The way the eat method works
 *   is that it consumes the token T if it matches the current lookahead token, then it gets a new
 *   token from the lexer and assigns that token to the current_token internal variable.
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
    this.getCurrentChar();
    this.showDebug = false;

    //console.log("Texto:", this.text);
  }

  getCurrentChar() {
    if (this.pos < this.text.length) {
      this.currentChar = this.text[this.pos];
    }
    else {
      this.currentChar = null;
    }
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

    if (
      this.currentChar == '+'
      || this.currentChar == '-'
      || this.currentChar == '*'
      || this.currentChar == '/'
    ) {
      token = new Token(TokenTypes.Operator, this.currentChar);
      this.advance();
      return token;
    }
    
    this.error();
  }

  eat(tokenTypes = null, skipSpaces = true) {
    if (!tokenTypes) {
      this.currentToken = this.getNextToken(skipSpaces);
      return;
    }

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
      this.currentToken = this.getNextToken(skipSpaces);
    }
    else {
      //console.log("eat ko");
      this.error(this.currentToken.type +" not in ", tokenTypes);
    }
  }

  term() {
    this.debug("Get term");
    let termToken = this.currentToken;
    this.eat([TokenTypes.TypeInteger, TokenTypes.TypeDecimal]);
    return termToken;
  }

  factor() {
    this.debug("Get factor");
    let termFactor = this.currentToken;
    this.eat([TokenTypes.TypeInteger, TokenTypes.TypeDecimal]);
    return termFactor;
  }

  operator() {
    this.debug("Get operator");
    let operatorToken = this.currentToken;
    this.eat(TokenTypes.Operator);
    return operatorToken;
  }



  /**
   * expr -> TypeInteger OpPlus TypeInteger
   */
  expr() {
    // set current token to the first token taken from the input
    this.debug("Start");
    this.eat();

    // Skip spaces (left of expression):
    // we expect the current token to be a single-digit integer
    this.debug("Get first number");
    //console.log("left", left);
    let left = this.term();
    while (this.currentToken.type != TokenTypes.EoF) {
      // we expect the current token to be an Operator token
      let op = this.operator();
      
      // we expect the current token to be a single-digit integer
      let right = this.term();

      // after the above call the this.current_token is set to EoF token.
      /* at this point TypeInteger OpPlus TypeInteger sequence of tokens
      has been successfully found and the method can just
      return the result of adding two integers, thus
      effectively interpreting client input */
      switch (op.value) {
        case "+":
          left.value += right.value;
          break;
        case "-":
          left.value -= right.value;
          break;
        case "*":
          left.value *= right.value;
          break;
        case "/":
          if (right.value == 0)
            left.value = NaN;
          else 
            left.value /= right.value;
          break;
      }
    }


    return left.value;
  }
}



module.exports = Interpreter;
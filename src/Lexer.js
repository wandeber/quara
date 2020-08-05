"use strict";

const {Token, TokenTypes} = require("./Token");
const {Types} = require('../helpers/BLib.js');






const ReserverKeywords = {
  "BEGIN": new Token('BEGIN', 'BEGIN'),
  "END":   new Token('END', 'END'),
  
  "true":  new Token(TokenTypes.TypeBoolean, true),
  //"yes":   new Token('TRUE', 'true'),
  //"ok":    new Token('TRUE', 'true'),
  "false": new Token(TokenTypes.TypeBoolean, false),
  //"no":    new Token('FALSE', 'false'),
  //"ko":    new Token('FALSE', 'false'),
};

const Operators = {
  '!':    new Token(TokenTypes.OpNot, '!'),
  '$not': new Token(TokenTypes.OpNot, '!'),
  
  '||':   new Token(TokenTypes.OpOr, '||'),
  '$or':  new Token(TokenTypes.OpOr, '||'),
  '&&':   new Token(TokenTypes.OpAnd, '&&'),
  '$and': new Token(TokenTypes.OpAnd, '&&'),

  '==':   new Token(TokenTypes.OpEqual, '=='), // ===
  '$eq':  new Token(TokenTypes.OpEqual, '=='), // ===
  '!=':   new Token(TokenTypes.OpNotEqual, '!='), // !==
  '<>':   new Token(TokenTypes.OpNotEqual, '!='), // !==
  '$ne':  new Token(TokenTypes.OpNotEqual, '!='), // !==
  
  '~=':   new Token(TokenTypes.OpLaxEqual, '~='), // Lax equality: == without type checking.
  '$leq': new Token(TokenTypes.OpLaxEqual, '~='), // Lax equality: == without type checking.
  '!~=':  new Token(TokenTypes.OpLaxNotEqual, '!~='), // Lax: != without type checking.
  '$lne': new Token(TokenTypes.OpLaxNotEqual, '!~='), // Lax: != without type checking.
  
  '<':    new Token(TokenTypes.OpLowerThan, '<'),
  '$lt':  new Token(TokenTypes.OpLowerThan, '<'),
  '>':    new Token(TokenTypes.OpGreaterThan, '>'),
  '$gt':  new Token(TokenTypes.OpGreaterThan, '>'),
  '<=':   new Token(TokenTypes.OpLowerThanEqual, '<='),
  '$lte': new Token(TokenTypes.OpLowerThanEqual, '<='),
  '>=':   new Token(TokenTypes.OpGreaterThanEqual, '>='),
  '$gte': new Token(TokenTypes.OpGreaterThanEqual, '>='),

  '+':    new Token(TokenTypes.OpPlus, '+'),
  '-':    new Token(TokenTypes.OpMinus, '-'),
  '*':    new Token(TokenTypes.OpMultiplication, '*'),
  '/':    new Token(TokenTypes.OpDivision, '/'),
  '%':    new Token(TokenTypes.OpModulus, '%'),
  '^':    new Token(TokenTypes.OpPow, '^'),
  '**':   new Token(TokenTypes.OpPow, '^'),
  '¬/':   new Token(TokenTypes.OpSqrt, '¬/'),
  
  '++':   new Token(TokenTypes.OpIncrement, '++'),
  '--':   new Token(TokenTypes.OpDecrement, '--'),
  
  '(':    new Token(TokenTypes.OpParenthesisOpen, '('),
  ')':    new Token(TokenTypes.OpParenthesisClose, ')'),
  
  '.':    new Token(TokenTypes.OpDot, '.'),
  ';':    new Token(TokenTypes.OpSemicolon, ';'),
}



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

  peek() {
    let peekPos = this.pos + 1;
    if (peekPos < this.text.length) {
      return this.text[peekPos];
    }
    return null;
  }

  advance() {
    this.pos++;
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

  getNumber() {
    let posAtStart = this.pos;
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
      currentValue += ""+ this.currentChar;
      this.advance();
    }
    
    return currentValue;
  }

  _id() {
    let result = "";
    while (this.currentChar != null && Types.isAlphanumeric(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    if (ReserverKeywords[result]) {
      return ReserverKeywords[result];
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

    let operator = this.getOperator();
    if (operator) { // Not null.
      return operator;
    }

    if (Types.isAlpha(this.currentChar)) {
      return this._id();
    }

    this.error();
  }
}



module.exports = {Lexer};

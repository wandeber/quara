"use strict";





const TypeInteger = "TypeInteger"; // 1
const Dot = "Dot"; // .
const TypeDecimal = "TypeDecimal"; // 1.1

const Space = "Space"; // " "

const Operator = "Operator";
const OpPlus = "OpPlus"; // "+"
const OpMinus = "OpMinus"; // "-"
const OpMultiplication = "OpTimes"; // "*"
const OpDivision = "OpDivision"; // "/"
const OpParenthesisOpen = '(';
const OpParenthesisClose = ')';

const EoF = "EoF"; // Fin.

const TokenTypes = {
  // Character
  TypeInteger, Space, Dot,
  
  // Composed
  TypeDecimal,
  
  Operator,
  OpPlus, OpMinus, OpMultiplication, OpDivision,
  OpParenthesisOpen, OpParenthesisClose,
  
  EoF
};



class Token {
  constructor(type, value) {
    // token type: TypeInteger, OpPlus, or EoF
    this.type = type
    // token value: 0, 1, 2. 3, 4, 5, 6, 7, 8, 9, '+', or None
    this.value = value
  }

  /**
   * String representation of the class instance.
   * Examples:
   * Token(TypeInteger, 3)
   * Token(OpPlus '+')
   */
  toString() {
    return `Token(${this.type}, ${this.value})`;
  }
      
  repr() {
    return this.toString();
  }
}



module.exports = {Token, TokenTypes, ...TokenTypes};

"use strict";





/*
Operators:
Arithmetic operators:
  +, -, *, /
Logic operators:
  $eq, $ne, $lt, $gt, $lte, $gte, $and, $or
  ==, !=, <>, <, >, <=, >=, &&, ||
Other:
  (, )
*/
const Space = "Space"; // " "
const Dot = "Dot"; // .

const TypeInteger = "TypeInteger"; // 1
const TypeDecimal = "TypeDecimal"; // 1.1

const OpPlus = "OpPlus"; // "+"
const OpMinus = "OpMinus"; // "-"
const OpMultiplication = "OpTimes"; // "*"
const OpDivision = "OpDivision"; // "/"
const OpModulus = "OpModulus"; // %
const OpPow = "OpPow"; // ^, **

const OpIncrement = "OpIncrement"; // ++
const OpDecrement = "OpDecrement"; // --

const OpNot = "Not";
const OpEqual = "OpEqual";
const OpNotEqual = "OpNotEqual";
const OpLowerThan = "OpLowerThan";
const OpGreaterThan = "OpGreaterThan";
const OpLowerThanEqual = "OpLowerThanEqual";
const OpGreaterThanEqual = "OpGreaterThanEqual";
const OpAnd = "OpAnd";
const OpOr = "OpOr";

const OpParenthesisOpen = 'OpParenthesisOpen';
const OpParenthesisClose = 'OpParenthesisClose';

const EoF = "EoF"; // Fin.



const TokenTypes = {
  Space, Dot,

  TypeInteger, TypeDecimal,
  
  OpPlus, OpMinus,
  OpMultiplication, OpDivision, OpModulus, OpPow,
  OpIncrement, OpDecrement,
  
  OpNot,
  OpEqual, OpNotEqual, OpLowerThan, OpGreaterThan, OpLowerThanEqual, OpGreaterThanEqual,
  OpAnd, OpOr,
  
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

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
const Id = "Id";

const Space = "Space"; // " "
const Dot = "Dot"; // .

const TypeInteger = "TypeInteger"; // 1
const TypeDecimal = "TypeDecimal"; // 1.1
const TypeBoolean = "TypeBoolean"; // true, false

const OpPlus = "OpPlus"; // "+"
const OpMinus = "OpMinus"; // "-"
const OpMultiplication = "OpTimes"; // "*"
const OpDivision = "OpDivision"; // "/"
const OpModulus = "OpModulus"; // %
const OpPow = "OpPow"; // ^, **
const OpSqrt = "OpSqrt"; // ¬/

const OpIncrement = "OpIncrement"; // ++
const OpDecrement = "OpDecrement"; // --

const OpNot = "Not";
const OpEqual = "OpEqual";
const OpLaxEqual = "OpLaxEqual";
const OpNotEqual = "OpNotEqual";
const OpLaxNotEqual = "OpLaxNotEqual";
const OpLowerThan = "OpLowerThan";
const OpGreaterThan = "OpGreaterThan";
const OpLowerThanEqual = "OpLowerThanEqual";
const OpGreaterThanEqual = "OpGreaterThanEqual";
const OpAnd = "OpAnd";
const OpOr = "OpOr";

const OpDot = "OpDot";
const OpSemicolon = "OpSemicolon";

const OpParenthesisOpen = 'OpParenthesisOpen';
const OpParenthesisClose = 'OpParenthesisClose';

const EoF = "EoF"; // Fin.



const TokenTypes = {
  Id,

  Space, Dot,

  TypeInteger, TypeDecimal, TypeBoolean,
  
  OpPlus, OpMinus,
  OpMultiplication, OpDivision, OpModulus, OpPow, OpSqrt,
  OpIncrement, OpDecrement,
  OpDot, OpSemicolon,
  
  OpNot,
  OpEqual, OpLaxEqual, OpNotEqual, OpLaxNotEqual,
  OpLowerThan, OpGreaterThan, OpLowerThanEqual, OpGreaterThanEqual,
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

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

const ModVar = "TypeVar";
const ModConst = "TypeConst";

const TypeAny = "TypeAny";
const TypeBoolean = "TypeBoolean";
const TypeChar = "TypeChar";
const TypeInteger = "TypeInteger";
const TypeFloat = "TypeFloat";
const TypeDouble = "TypeDouble";
const TypeString = "TypeString";

const BooleanConstant = "BooleanConstant"; // true, false
const CharConstant = "CharConstant";
const IntegerConstant = "IntegerConstant"; // 1
const DecimalConstant = "DecimalConstant"; // 1.1
const StringConstant = "StringConstant";

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

const OpAssign = "OpAssign";
const OpPlusAssign = "OpPlusAssign";
const OpMinusAssign = "OpMinusAssign";
const OpMultiplicationAssign = "OpMultiplicationAssign";
const OpDivisionAssign = "OpDivisionAssign";
const OpModulusAssign = "OpModulusAssign";
const OpPowAssign = "OpPowAssign";

const OpDot = "OpDot";
const OpArrayAccessorOpen = "OpArrayAccessorOpen";
const OpArrayAccessorClose = "OpArrayAccessorClose";
const OpSemicolon = "OpSemicolon";
const OpQuote = "OpQuote";
const OpComma = "OpComma";

const OpParenthesisOpen = 'OpParenthesisOpen';
const OpParenthesisClose = 'OpParenthesisClose';

const EoF = "EoF"; // Fin.



const TokenTypes = {
  Id,
  
  ModVar, ModConst,
  TypeAny, TypeBoolean, TypeChar, TypeInteger, TypeFloat, TypeDouble, TypeString,
  
  BooleanConstant, CharConstant, IntegerConstant, DecimalConstant, StringConstant,
  
  OpPlus, OpMinus,
  OpMultiplication, OpDivision, OpModulus, OpPow, OpSqrt,
  OpIncrement, OpDecrement,
  
  OpNot,
  OpEqual, OpLaxEqual, OpNotEqual, OpLaxNotEqual,
  OpLowerThan, OpGreaterThan, OpLowerThanEqual, OpGreaterThanEqual,
  OpAnd, OpOr,
  
  OpAssign,
  OpPlusAssign, OpMinusAssign,
  OpMultiplicationAssign, OpDivisionAssign, OpModulusAssign,
  OpPowAssign,
  
  Space, Dot,
  OpSemicolon, OpComma,
  OpQuote,
  OpParenthesisOpen, OpParenthesisClose,
  OpDot,
  OpArrayAccessorOpen, OpArrayAccessorClose,

  EoF
};



class Token {
  constructor(type, value) {
    // token type: IntegerConstant, OpPlus, or EoF
    this.type = type;
    // token value: 0, 1, 2. 3, 4, 5, 6, 7, 8, 9, '+', or None
    this.value = value;
  }

  /**
   * String representation of the class instance.
   * Examples:
   * Token(IntegerConstant, 3)
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

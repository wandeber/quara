"use strict";

const {Token, TokenTypes} = require("../Token");





const Operators = {
  "!":    new Token(TokenTypes.OpNot, "!"),
  "$not": new Token(TokenTypes.OpNot, "!"),
  
  "||":   new Token(TokenTypes.OpOr, "||"),
  "$or":  new Token(TokenTypes.OpOr, "||"),
  "&&":   new Token(TokenTypes.OpAnd, "&&"),
  "$and": new Token(TokenTypes.OpAnd, "&&"),

  "==":   new Token(TokenTypes.OpEqual, "=="), // ===
  "$eq":  new Token(TokenTypes.OpEqual, "=="), // ===
  "!=":   new Token(TokenTypes.OpNotEqual, "!="), // !==
  "<>":   new Token(TokenTypes.OpNotEqual, "!="), // !==
  "$ne":  new Token(TokenTypes.OpNotEqual, "!="), // !==
  
  "~=":   new Token(TokenTypes.OpLaxEqual, "~="), // Lax equality: == without type checking.
  "$leq": new Token(TokenTypes.OpLaxEqual, "~="), // Lax equality: == without type checking.
  "!~=":  new Token(TokenTypes.OpLaxNotEqual, "!~="), // Lax: != without type checking.
  "$lne": new Token(TokenTypes.OpLaxNotEqual, "!~="), // Lax: != without type checking.
  
  '<':    new Token(TokenTypes.OpLowerThan, '<'),
  "$lt":  new Token(TokenTypes.OpLowerThan, '<'),
  '>':    new Token(TokenTypes.OpGreaterThan, '>'),
  "$gt":  new Token(TokenTypes.OpGreaterThan, '>'),
  "<=":   new Token(TokenTypes.OpLowerThanEqual, "<="),
  "$lte": new Token(TokenTypes.OpLowerThanEqual, "<="),
  ">=":   new Token(TokenTypes.OpGreaterThanEqual, ">="),
  "$gte": new Token(TokenTypes.OpGreaterThanEqual, ">="),

  '+':    new Token(TokenTypes.OpPlus, '+'),
  '-':    new Token(TokenTypes.OpMinus, '-'),
  '*':    new Token(TokenTypes.OpMultiplication, '*'),
  '/':    new Token(TokenTypes.OpDivision, '/'),
  '%':    new Token(TokenTypes.OpModulus, '%'),
  "^":    new Token(TokenTypes.OpPow, "^"),
  "**":   new Token(TokenTypes.OpPow, "^"),
  "¬/":   new Token(TokenTypes.OpSqrt, "¬/"),
  
  "++":   new Token(TokenTypes.OpIncrement, "++"),
  "--":   new Token(TokenTypes.OpDecrement, "--"),
  
  '=':    new Token(TokenTypes.OpAssign, '='),
  "+=":   new Token(TokenTypes.OpPlusAssign, "+="),
  "-=":   new Token(TokenTypes.OpMinusAssign, "-="),
  "*=":   new Token(TokenTypes.OpMultiplicationAssign, "*="),
  "/=":   new Token(TokenTypes.OpDivisionAssign, "/="),
  "%=":   new Token(TokenTypes.OpModulusAssign, "%="),
  "^=":   new Token(TokenTypes.OpPowAssign, "^="),
  "**=":  new Token(TokenTypes.OpPowAssign, "^="),

  '(':    new Token(TokenTypes.OpParenthesisOpen, '('),
  ')':    new Token(TokenTypes.OpParenthesisClose, ')'),

  '.':    new Token(TokenTypes.OpDot, '.'),
  ';':    new Token(TokenTypes.OpSemicolon, ';'),
  ',':    new Token(TokenTypes.OpComma, ','),

  '"':    new Token(TokenTypes.OpQuote, ';'),
}



module.exports = {Operators};
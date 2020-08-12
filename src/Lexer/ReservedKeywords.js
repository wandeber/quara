"use strict";

const {Token, TokenTypes} = require("../Token");





const ReservedKeywords = {
  "BEGIN": new Token("BEGIN", "BEGIN"),
  "END":   new Token("END", "END"),
  
  "true":  new Token(TokenTypes.BooleanConstant, true),
  "false": new Token(TokenTypes.BooleanConstant, false),

  "const": new Token(TokenTypes.ModConst, 'const'),
  "var":   new Token(TokenTypes.ModVar, 'var'),
  
  "any":     new Token(TokenTypes.TypeAny, 'any'),
  //"char":    new Token(TokenTypes.TypeChar, 'char'),
  "int":     new Token(TokenTypes.TypeInteger, 'int'),
  "integer": new Token(TokenTypes.TypeInteger, 'int'),
  "float":   new Token(TokenTypes.TypeFloat, 'float'),
  "double":  new Token(TokenTypes.TypeDouble, 'double'),
  "string":  new Token(TokenTypes.TypeString, 'string'),
};



module.exports = {ReservedKeywords};

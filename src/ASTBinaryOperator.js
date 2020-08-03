"use strict";

const {AST} = require('./AST');





class ASTBinaryOperator extends AST {
  constructor(left, operator, right) {
    this.left = left;
    this.token = this.operator = operator;
    this.right = right;
  }
}



module.exports = {ASTBinaryOperator};

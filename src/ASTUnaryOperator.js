"use strict";

const {AST} = require('./AST');





class ASTUnaryOperator extends AST {
  constructor(operator, expr) {
    super();
    this.token = this.operator = operator;
    this.expr = expr;
  }
}



module.exports = {ASTUnaryOperator};

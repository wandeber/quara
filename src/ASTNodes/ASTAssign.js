"use strict";

const {ASTBinaryOperator} = require('./ASTBinaryOperator');





class ASTAssign extends ASTBinaryOperator {
  constructor(left, operator, right) {
    super(left, operator, right);
  }
}



module.exports = {ASTAssign};

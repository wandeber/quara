"use strict";

const {AST} = require("./AST");





class ASTBoolean extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }
}



module.exports = {ASTBoolean};

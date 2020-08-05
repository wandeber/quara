"use strict";

const {AST} = require("./AST");





class ASTVariable extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.name = token.value;
  }
}



module.exports = {ASTVariable};

"use strict";

const {AST} = require("./AST");





class ASTVariable extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.name = token.value; // Change by this.value?
  }
}



module.exports = {ASTVariable};

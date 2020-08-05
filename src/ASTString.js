"use strict";

const {AST} = require("./AST");





class ASTString extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }
}



module.exports = {ASTString};

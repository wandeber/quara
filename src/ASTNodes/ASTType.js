"use strict";

const {AST} = require('./AST');





class ASTType extends AST {
  constructor(token) {
    super();
    this.token = token;
    this.value = token.value;
  }
}



module.exports = {ASTType};

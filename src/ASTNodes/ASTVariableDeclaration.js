"use strict";

const {AST} = require('./AST');





class ASTVariableDeclaration extends AST {
  constructor(varNode, typeNode, right) {
    super();
    this.varNode = varNode;
    this.typeNode = typeNode;
    this.right = right;
  }
}



module.exports = {ASTVariableDeclaration};

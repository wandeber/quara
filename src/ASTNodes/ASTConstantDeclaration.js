"use strict";

const {AST} = require('./AST');





class ASTConstantDeclaration extends AST {
  constructor(varNode, typeNode) {
    super();
    this.varNode = varNode;
    this.typeNode = typeNode;
  }
}



module.exports = {ASTConstantDeclaration};

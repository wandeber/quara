"use strict";

const {ASTCompound} = require('./ASTCompound');





class ASTVariableDeclaration extends ASTCompound {
  constructor(typeNode) {
    super();
    this.typeNode = typeNode;
  }
}



module.exports = {ASTVariableDeclaration};

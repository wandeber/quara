"use strict";

const {ASTCompound} = require('./ASTCompound');





class ASTConstantDeclaration extends ASTCompound {
  constructor(typeNode) {
    super();
    this.typeNode = typeNode;
  }
}



module.exports = {ASTConstantDeclaration};

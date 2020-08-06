"use strict";

const {AST} = require("./AST");





class ASTCompound extends AST {
  constructor() {
    super();
    this.children = [];
  }
}



module.exports = {ASTCompound};

"use strict";

const {TokenTypes} = require("./Token");
const {NodeVisitor} = require("./NodeVisitor");





/**
 *
 */
class Interpreter extends NodeVisitor {
  constructor(parser) {
    super();
    this.showDebug = false;
    this.parser = parser;
  }



  error(message, me) {
    if (message) {
      console.log(message, me);
    }
    throw new Error('Ivalid syntax.');
  }
  
  debug(message = "") {
    if (this.showDebug) {
      this.lexer.debug(message);
      console.log("-- Interpreter: "+ message);
      if (this.currentToken) {
        console.log("  current token - "+ this.currentToken.type +" - "+ this.currentToken.value);
      }
    }
  }



  visit_ASTBinaryOperator(node) {
    let result;

    if (node.operator.type == TokenTypes.OpPlus)
      result = this.visit(node.left) + this.visit(node.right);
    else if (node.operator.type == TokenTypes.OpMinus)
      result = this.visit(node.left) - this.visit(node.right);
    else if (node.operator.type == TokenTypes.OpMultiplication)
      result = this.visit(node.left) * this.visit(node.right);
    else if (node.operator.type == TokenTypes.OpDivision)
      result = this.visit(node.left) / this.visit(node.right);
    
    return result;
  }

  visit_ASTNumber(node) {
    return node.value;
  }



  interpret() {
    let tree = this.parser.parse();
    return this.visit(tree);
  }
}



module.exports = {Interpreter};

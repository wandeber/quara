"use strict";

const {NodeVisitor} = require("./NodeVisitor");





/**
 * Translates input to Reverse Polish Notation (RPN).
 * Example:
 *   (5 + 3) * 12 / 3   ->   5 3 + 12 * 3 /
 */
class RPNTranslator extends NodeVisitor {
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
      console.log("-- RPNTranslator: "+ message);
      if (this.currentToken) {
        console.log("  current token - "+ this.currentToken.type +" - "+ this.currentToken.value);
      }
    }
  }



  visit_ASTBinaryOperator(node) {
    let result;

    result = this.visit(node.left) +" "+ this.visit(node.right) +" "+ node.operator.value;
    
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



module.exports = {RPNTranslator};

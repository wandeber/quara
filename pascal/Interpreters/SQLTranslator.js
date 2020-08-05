"use strict";

const {TokenTypes} = require("../Token");
const {NodeVisitor} = require("../NodeVisitor");





/**
 * Translates input to Lisp.
 * Example:
 *   (2 + 3 * 5)   ->    (+ 2 (* 3 5)).
 */
class SQLTranslator extends NodeVisitor {
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
      console.log("-- SQLTranslator: "+ message);
      if (this.currentToken) {
        console.log("  current token - "+ this.currentToken.type +" - "+ this.currentToken.value);
      }
    }
  }



  visit_ASTBinaryOperator(node) {
    let result;

    if (node.operator.type == TokenTypes.OpPlus) {
      result = this.visit(node.left) + this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = this.visit(node.left) - this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpMultiplication) {
      result = this.visit(node.left) * this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpDivision) {
      result = this.visit(node.left) / this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpModulus) {
      result = this.visit(node.left) % this.visit(node.right);
    }

    else if (node.operator.type == TokenTypes.OpEqual) {
      result = {};
      result[this.visit(node.left)] = {$eq: this.visit(node.right)};
      return result;
    }
    else if (node.operator.type == TokenTypes.OpNotEqual) {
      result = {};
      result[this.visit(node.left)] = {$ne: this.visit(node.right)};
      return result;
    }
    else if (node.operator.type == TokenTypes.OpLowerThan) {
      result = {};
      result[this.visit(node.left)] = {$lt: this.visit(node.right)};
      return result;
    }
    else if (node.operator.type == TokenTypes.OpGreaterThan) {
      result = {};
      result[this.visit(node.left)] = {$gt: this.visit(node.right)};
      return result;
    }
    else if (node.operator.type == TokenTypes.OpLowerThanEqual) {
      result = {};
      result[this.visit(node.left)] = {$lte: this.visit(node.right)};
      return result;
    }
    else if (node.operator.type == TokenTypes.OpGreaterThanEqual) {
      result = {};
      result[this.visit(node.left)] = {$gte: this.visit(node.right)};
      return result;
    }

    else if (node.operator.type == TokenTypes.OpAnd) {
      result = {$and: [this.visit(node.left), this.visit(node.right)]};
    }
    else if (node.operator.type == TokenTypes.OpOr) {
      result = {$or: [this.visit(node.left), this.visit(node.right)]};
    }
    
    return result;
  }

  visit_ASTUnaryOperator(node) {
    let result;

    if (node.operator.type == TokenTypes.OpPlus) {
      result = this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = -this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpNot) {
      result = {$not: this.visit(node.expr)};
    }
    
    return result;
  }

  visit_ASTNumber(node) {
    return node.value;
  }



  interpret() {
    let tree = this.parser.parse();
    if (tree) {
      return this.visit(tree);
    }
    return false;
  }
}



module.exports = {SQLTranslator};

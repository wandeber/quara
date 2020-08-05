"use strict";

const {TokenTypes} = require("../Token");
const {NodeVisitor} = require("../NodeVisitor");





const AvailableVariables = {
  sampleNumber: 4,
  sampleString: "un string",
  
  sampleObject: {
    prop1: "prop1 value",
    prop2: "prop2 value"
  },

  sampleSimpleArray: [
    "value 1", "value 2"
  ],

  sampleArray: [
    {
      id: 1,
      prop1: "prop1 value",
      prop2: "prop2 value"
    },
    {
      id: 2,
      prop1: "prop1 value",
      prop2: "prop2 value"
    }
  ]
};

/*
"prop1" in sampleObject
"value 1" in sampleSimpleArray
1 in sampleSimpleArray[any].id
*/

/**
 *
 */
class Interpreter extends NodeVisitor {
  constructor(parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;
    this.showDebug = showDebug;
    this.variables = AvailableVariables;
    Object.assign(this.variables, variables);
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
    else if (node.operator.type == TokenTypes.OpPow) {
      result = Math.pow(this.visit(node.left), this.visit(node.right));
    }

    else if (node.operator.type == TokenTypes.OpEqual) {
      result = this.visit(node.left) === this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpLaxEqual) {
      result = this.visit(node.left) == this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpNotEqual) {
      result = this.visit(node.left) !== this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpLaxNotEqual) {
      result = this.visit(node.left) === this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpLowerThan) {
      result = this.visit(node.left) < this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpGreaterThan) {
      result = this.visit(node.left) > this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpLowerThanEqual) {
      result = this.visit(node.left) <= this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpGreaterThanEqual) {
      result = this.visit(node.left) >= this.visit(node.right);
    }

    else if (node.operator.type == TokenTypes.OpAnd) {
      result = this.visit(node.left) && this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpOr) {
      result = this.visit(node.left) || this.visit(node.right);
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
      result = !this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpSqrt) {
      result = Math.sqrt(this.visit(node.expr));
    }
    
    return result;
  }

  visit_ASTNumber(node) {
    return node.value;
  }

  visit_ASTBoolean(node) {
    return node.value;
  }

  visit_ASTString(node) {
    return node.value;
  }

  visit_ASTVariable(node) {
    return this.variables[node.name];
  }



  interpret() {
    let tree = this.parser.parse();
    return this.visit(tree);
  }
}



module.exports = {Interpreter};

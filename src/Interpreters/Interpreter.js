"use strict";

const {TokenTypes} = require("../Token");
const {NodeVisitor} = require("./NodeVisitor");





const DefaultVariables = {
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
    this.globalScope = DefaultVariables;

    Object.assign(this.globalScope, variables);
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
    let result, left, right;

    switch (node.operator.type) {
      case TokenTypes.OpPlus:
        result = this.visit(node.left) + this.visit(node.right);
        break;
      case TokenTypes.OpMinus:
        result = this.visit(node.left) - this.visit(node.right);
        break;
      case TokenTypes.OpMultiplication:
        result = this.visit(node.left) * this.visit(node.right);
        break;
      case TokenTypes.OpDivision:
        result = this.visit(node.left) / this.visit(node.right);
        break;
      case TokenTypes.OpModulus:
        result = this.visit(node.left) % this.visit(node.right);
        break;
      case TokenTypes.OpPow:
        result = this.visit(node.left) ** this.visit(node.right);
        break;

      case TokenTypes.OpEqual:
        result = this.visit(node.left) === this.visit(node.right);
        break;
      case TokenTypes.OpLaxEqual:
        result = this.visit(node.left) == this.visit(node.right);
        break;
      case TokenTypes.OpNotEqual:
        result = this.visit(node.left) !== this.visit(node.right);
        break;
      case TokenTypes.OpLaxNotEqual:
        result = this.visit(node.left) === this.visit(node.right);
        break;
      case TokenTypes.OpLowerThan:
        result = this.visit(node.left) < this.visit(node.right);
        break;
      case TokenTypes.OpGreaterThan:
        result = this.visit(node.left) > this.visit(node.right);
        break;
      case TokenTypes.OpLowerThanEqual:
        result = this.visit(node.left) <= this.visit(node.right);
        break;
      case TokenTypes.OpGreaterThanEqual:
        result = this.visit(node.left) >= this.visit(node.right);
        break;
      
      case TokenTypes.OpAnd:
        result = this.visit(node.left) && this.visit(node.right);
        break;
      case TokenTypes.OpOr:
        result = this.visit(node.left) || this.visit(node.right);
        break;
      
      case TokenTypes.OpDot:
        left = this.visit(node.left);
        if (
          typeof left !== "undefined"
          && typeof node.right.name !== "undefined"
          && typeof left[node.right.name] !== "function"
        ) {
          result = left[node.right.name];
        }
        break;
      case TokenTypes.OpArrayAccessorOpen:
        left = this.visit(node.left);
        right = this.visit(node.right);
        if (typeof left !== "undefined" && typeof left[right] !== "function") {
          result = left[right];
        }
        break;

      default: break;
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
    return this.globalScope[node.name];
  }

  visit_ASTType(node) {
    return node.value;
  }

  visit_ASTAssign(node) {
    if (typeof this.globalScope[node.left.name] == "undefined") {
      throw new Error("La variable "+ node.left.name +" no ha sido declarada.");
    }

    let value;
    switch (node.operator.type) {
      case TokenTypes.OpAssign:
        value = this.visit(node.right);
        break;
      case TokenTypes.OpPlusAssign:
        value = this.visit(node.left) + this.visit(node.right);
        break;
      case TokenTypes.OpMinusAssign:
        value = this.visit(node.left) - this.visit(node.right);
        break;
      case TokenTypes.OpMultiplicationAssign:
        value = this.visit(node.left) * this.visit(node.right);
        break;
      case TokenTypes.OpDivisionAssign:
        value = this.visit(node.left) / this.visit(node.right);
        break;
      case TokenTypes.OpModulusAssign:
        value = this.visit(node.left) % this.visit(node.right);
        break;
      case TokenTypes.OpPowAssign:
        //value = Math.pow(this.visit(node.left), this.visit(node.right));
        value = this.visit(node.left) ** this.visit(node.right);
        break;
      default:
        this.error("Unknown operator", node.operator);
        break;
    }
    this.globalScope[node.left.name] = value;
    return this.globalScope[node.left.name];
  }

  visit_ASTVariableDeclaration(node) {
    //let type = "any"; // Default any or deduce from value?
    //if (node.nodeType) {
    //  type = this.visit(node.nodeType);
    //}
    //console.log("Type: ", type);
    
    let name;
    for (let child of node.children) {
      //console.log("child", child);
      if (child.left && child.left.name) {
        name = child.left.name;
      }
      else {
        name = child.name;
      }

      if (typeof this.globalScope[name] != "undefined") {
        throw new Error(`Variable ${name} already declared.`);
      }

      // Declaration...
      this.globalScope[name] = null;

      // Maybe initialization...
      this.visit(child);
    }

    return this.globalScope[name];
  }

  visit_ASTConstantDeclaration(node) {
    this.debug("visit_ASTConstantDeclaration");
    //let type = "any"; // Const puede ser any? Que sea como no ponerlo?
    //if (node.nodeType) {
    //  type = this.visit(node.nodeType);
    //}
    //console.log("Type: ", type);
    
    let name;
    for (let child of node.children) {
      //console.log("child", child);
      if (child.left && child.left.name) {
        name = child.left.name;
      }
      else {
        name = child.name;
      }

      if (typeof this.globalScope[name] != "undefined") {
        throw new Error(`Variable ${name} already declared.`);
      }

      // Declaration...
      this.globalScope[name] = null;

      // Maybe initialization...
      this.visit(child);
    }

    return this.globalScope[name];
  }

  visit_ASTCompound(node) {
    let result = [];
    for (let child of node.children) {
      result.push(this.visit(child));
    }
    if (result.length > 0) {
      result = result[result.length - 1];
    }
    return result;
  }



  interpret() {
    let tree = this.parser.parse();
    return this.visit(tree);
  }
}
 


module.exports = {Interpreter};

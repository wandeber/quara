import ASTAssign from "../ASTNodes/ASTAssign";
import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTBoolean from "../ASTNodes/ASTBoolean";
import ASTCompound from "../ASTNodes/ASTCompound";
import ASTConstantDeclaration from "../ASTNodes/ASTConstantDeclaration";
import ASTNumber from "../ASTNodes/ASTNumber";
import ASTString from "../ASTNodes/ASTString";
import ASTType from "../ASTNodes/ASTType";
import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVariable from "../ASTNodes/ASTVariable";
import ASTVariableDeclaration from "../ASTNodes/ASTVariableDeclaration";
import {ASTWithName} from "../ASTNodes/AST";
import NodeVisitor from "./NodeVisitor";
import Parser from "../Parser";
import TokenTypes from "../TokenTypes";





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
export default class Interpreter extends NodeVisitor {
  constructor(parser: Parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;
    this.showDebug = showDebug;
    this.globalScope = DefaultVariables;

    Object.assign(this.globalScope, variables);
  }



  error(message: string, me: any) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Ivalid syntax.");
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


  
  /* eslint-disable-next-line max-lines-per-function, complexity */
  visit_ASTBinaryOperator(node: ASTBinaryOperator) {
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
        result = this.visit(node.left) != this.visit(node.right);
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

    if (result === -0) {
      result = 0;
    }

    return result;
  }

  visit_ASTUnaryOperator(node: ASTUnaryOperator) {
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

    if (result === -0) {
      result = 0;
    }
    
    return result;
  }

  visit_ASTNumber(node: ASTNumber) {
    let {value} = node;
    if (value === -0) {
      value = 0;
    }
    return value;
  }

  visit_ASTBoolean(node: ASTBoolean) {
    return node.value;
  }

  visit_ASTString(node: ASTString) {
    return node.value;
  }

  visit_ASTVariable(node: ASTVariable) {
    return this.globalScope[node.name];
  }

  visit_ASTType(node: ASTType) {
    return node.value;
  }

  visit_ASTAssign(node: ASTAssign) {
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

    if (value === -0) {
      value = 0;
    }

    this.globalScope[node.left.name] = value;
    return this.globalScope[node.left.name];
  }

  visit_ASTVariableDeclaration(node: ASTVariableDeclaration) {
    //let type = "any"; // Default any or deduce from value?
    //if (node.nodeType) {
    //  type = this.visit(node.nodeType);
    //}
    //console.log("Type: ", type);
    
    let name;
    for (let child of node.children) {
      //console.log("child", child);
      let childBinaryOperator: ASTBinaryOperator = child as ASTBinaryOperator;
      if (childBinaryOperator.left && childBinaryOperator.left.name) {
        ({name} = childBinaryOperator.left);
      }
      else {
        ({name} = child as ASTWithName); // TODO: ¿Esto es necesario?
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

  visit_ASTConstantDeclaration(node: ASTConstantDeclaration) {
    this.debug("visit_ASTConstantDeclaration");
    //let type = "any"; // Const puede ser any? Que sea como no ponerlo?
    //if (node.nodeType) {
    //  type = this.visit(node.nodeType);
    //}
    //console.log("Type: ", type);
    
    let name;
    for (let child of node.children) {
      //console.log("child", child);
      let childBinaryOperator: ASTBinaryOperator = child as ASTBinaryOperator;
      if (childBinaryOperator.left && childBinaryOperator.left.name) {
        ({name} = childBinaryOperator.left);
      }
      else {
        ({name} = child as ASTWithName); // TODO: ¿Esto es necesario?
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

  visit_ASTCompound(node: ASTCompound) {
    let result: any = [];
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

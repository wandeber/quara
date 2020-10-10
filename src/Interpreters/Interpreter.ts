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
import ASTVisitor from "../ASTNodes/ASTVisitor";
import {ASTWithName} from "../ASTNodes/AST";
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
export default class Interpreter extends ASTVisitor {
  parser: Parser;

  globalScope: any = {};

  showDebug: boolean;



  constructor(parser: Parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;
    this.showDebug = showDebug;
    Object.assign(this.globalScope, DefaultVariables);
    Object.assign(this.globalScope, variables);
  }



  error(message: string, me: any) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Ivalid syntax.");
  }
  
  debug(message = "") {
    console.log("-- Interpreter: "+ message);
  }


  
  /* eslint-disable-next-line max-lines-per-function, complexity */
  visitASTBinaryOperator(node: ASTBinaryOperator) {
    let result, left, right;

    switch (node.operator.type) {
      case TokenTypes.OpPlus:
        result = node.left.visit(this) + node.right.visit(this);
        break;
      case TokenTypes.OpMinus:
        result = node.left.visit(this) - node.right.visit(this);
        break;
      case TokenTypes.OpMultiplication:
        result = node.left.visit(this) * node.right.visit(this);
        break;
      case TokenTypes.OpDivision:
        result = node.left.visit(this) / node.right.visit(this);
        break;
      case TokenTypes.OpModulus:
        result = node.left.visit(this) % node.right.visit(this);
        break;
      case TokenTypes.OpPow:
        result = node.left.visit(this) ** node.right.visit(this);
        break;

      case TokenTypes.OpEqual:
        result = node.left.visit(this) === node.right.visit(this);
        break;
      case TokenTypes.OpLaxEqual:
        result = node.left.visit(this) == node.right.visit(this);
        break;
      case TokenTypes.OpNotEqual:
        result = node.left.visit(this) !== node.right.visit(this);
        break;
      case TokenTypes.OpLaxNotEqual:
        result = node.left.visit(this) != node.right.visit(this);
        break;
      case TokenTypes.OpLowerThan:
        result = node.left.visit(this) < node.right.visit(this);
        break;
      case TokenTypes.OpGreaterThan:
        result = node.left.visit(this) > node.right.visit(this);
        break;
      case TokenTypes.OpLowerThanEqual:
        result = node.left.visit(this) <= node.right.visit(this);
        break;
      case TokenTypes.OpGreaterThanEqual:
        result = node.left.visit(this) >= node.right.visit(this);
        break;
      
      case TokenTypes.OpAnd:
        result = node.left.visit(this) && node.right.visit(this);
        break;
      case TokenTypes.OpOr:
        result = node.left.visit(this) || node.right.visit(this);
        break;
      
      case TokenTypes.OpDot:
        left = node.left.visit(this);
        if (
          typeof left !== "undefined"
          && typeof node.right.name !== "undefined"
          && typeof left[node.right.name] !== "function"
        ) {
          result = left[node.right.name];
        }
        break;
      case TokenTypes.OpArrayAccessorOpen:
        left = node.left.visit(this);
        right = node.right.visit(this);
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

  visitASTUnaryOperator(node: ASTUnaryOperator) {
    let result;
    
    if (node.operator.type == TokenTypes.OpPlus) {
      result = node.expr.visit(this);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = -node.expr.visit(this);
    }
    else if (node.operator.type == TokenTypes.OpNot) {
      result = !node.expr.visit(this);
    }
    else if (node.operator.type == TokenTypes.OpSqrt) {
      result = Math.sqrt(node.expr.visit(this));
    }

    if (result === -0) {
      result = 0;
    }
    
    return result;
  }

  visitASTNumber(node: ASTNumber) {
    let {value} = node;
    if (value === -0) {
      value = 0;
    }
    return value;
  }

  visitASTBoolean(node: ASTBoolean) {
    return node.value;
  }

  visitASTString(node: ASTString) {
    return node.value;
  }

  visitASTVariable(node: ASTVariable) {
    return this.globalScope[node.name];
  }

  visitASTType(node: ASTType) {
    return node.value;
  }

  visitASTAssign(node: ASTAssign) {
    if (typeof this.globalScope[node.left.name] == "undefined") {
      throw new Error("La variable "+ node.left.name +" no ha sido declarada.");
    }

    let value;
    switch (node.operator.type) {
      case TokenTypes.OpAssign:
        value = node.right.visit(this);
        break;
      case TokenTypes.OpPlusAssign:
        value = node.left.visit(this) + node.right.visit(this);
        break;
      case TokenTypes.OpMinusAssign:
        value = node.left.visit(this) - node.right.visit(this);
        break;
      case TokenTypes.OpMultiplicationAssign:
        value = node.left.visit(this) * node.right.visit(this);
        break;
      case TokenTypes.OpDivisionAssign:
        value = node.left.visit(this) / node.right.visit(this);
        break;
      case TokenTypes.OpModulusAssign:
        value = node.left.visit(this) % node.right.visit(this);
        break;
      case TokenTypes.OpPowAssign:
        //value = Math.pow(node.left.visit(this), node.right.visit(this));
        value = node.left.visit(this) ** node.right.visit(this);
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

  visitASTVariableDeclaration(node: ASTVariableDeclaration) {
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
      child.visit(this);
    }

    return this.globalScope[name];
  }

  visitASTConstantDeclaration(node: ASTConstantDeclaration) {
    this.debug("visitASTConstantDeclaration");
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
      child.visit(this);
    }

    return this.globalScope[name];
  }

  visitASTCompound(node: ASTCompound) {
    let result: any = [];
    for (let child of node.children) {
      result.push(child.visit(this));
    }
    if (result.length > 0) {
      result = result[result.length - 1];
    }
    return result;
  }



  interpret() {
    let tree = this.parser.parse();
    return tree.visit(this);
    //return this.visit(tree);
  }
}

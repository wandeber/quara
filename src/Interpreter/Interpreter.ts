import ASTBooleanVisitor from "./ASTBooleanVisitor";
import ASTNumberVisitor from "./ASTNumberVisitor";
import ASTStringVisitor from "./ASTStringVisitor";
import ASTUnaryOperatorVisitor from "./ASTUnaryOperatorVisitor";
import Parser from "../Parser";
import ASTBinaryOperatorVisitor from "./ASTBinaryOperatorVisitor";
import ASTFunctionCallVisitor from "./ASTFunctionCallVisitor";
import ASTAssignVisitor from "./ASTAssignVisitor";
import ASTVariableVisitor from "./ASTVariableVisitor";
import ASTTypeVisitor from "./ASTTypeVisitor";
import ASTVariableDeclarationVisitor from "./ASTVariableDeclarationVisitor";
import ASTConstantDeclarationVisitor from "./ASTConstantDeclarationVisitor";
import ASTCompoundVisitor from "./ASTCompoundVisitor";
import AST from "../ASTNodes/AST";
import {IASTVisitor} from "./ASTVisitor";
import ASTInterpreter from "./ASTInterpreter";





const DefaultVariables = {
  fixed(num: number, ...args: any[]) {
    return num.toFixed(...args);
  },
  upperCase(str: string) {
    return str.toUpperCase();
  },
  lowerCase(str: string) {
    return str.toLowerCase();
  },
  contains(arr: string|any[], ...args: [any, any]) {
    return arr.includes(...args);
  },
  isNaN(num: number) {
    return Number.isNaN(num);
  },

  sampleNumber: 4,
  sampleString: "un string",

  sampleObject: {
    prop1: "prop1 value",
    prop2: "prop2 value",
  },

  sampleSimpleArray: [
    "value 1", "value 2",
  ],

  sampleArray: [
    {
      id: 1,
      prop1: "prop1 value",
      prop2: "prop2 value",
    },
    {
      id: 2,
      prop1: "prop1 value",
      prop2: "prop2 value",
    },
  ],
};

/*
"prop1" in sampleObject
"value 1" in sampleSimpleArray
1 in sampleSimpleArray[any].id
*/

/**
 *
 */
export default class Interpreter extends ASTInterpreter {
  parser: Parser;

  globalScope: any = {};

  showDebug: boolean;
  visitors: Map<string, IASTVisitor> = new Map();



  constructor(parser: Parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;
    this.showDebug = showDebug;
    Object.assign(this.globalScope, DefaultVariables);
    Object.assign(this.globalScope, variables);

    // TODO: Una opción para sacar esto de aquí es que se registren las clases Visitors después de
    //   ser definidas. Este constructor podría usar esos datos para registrar todos los visitors en
    //   bucle.
    this.registerVisitor("ASTAssign", new ASTAssignVisitor(this));
    this.registerVisitor("ASTBinaryOperator", new ASTBinaryOperatorVisitor(this));
    this.registerVisitor("ASTBoolean", new ASTBooleanVisitor(this));
    // this.registerVisitor("ASTChar", new ASTCharVisitor(this));
    this.registerVisitor("ASTCompound", new ASTCompoundVisitor(this));
    this.registerVisitor("ASTConstantDeclaration", new ASTConstantDeclarationVisitor(this));
    this.registerVisitor("ASTFunctionCall", new ASTFunctionCallVisitor(this));
    this.registerVisitor("ASTNumber", new ASTNumberVisitor(this));
    this.registerVisitor("ASTString", new ASTStringVisitor(this));
    this.registerVisitor("ASTType", new ASTTypeVisitor(this));
    this.registerVisitor("ASTUnaryOperator", new ASTUnaryOperatorVisitor(this));
    this.registerVisitor("ASTVariableDeclaration", new ASTVariableDeclarationVisitor(this));
    this.registerVisitor("ASTVariable", new ASTVariableVisitor(this));
  }


  setVariables(variables: any) {
    Object.assign(this.globalScope, variables);
  }

  visit(node: AST) {
    let visitorName = node.constructor.name;
    if (!this.visitors.has(visitorName)) {
      throw new Error(`Visitor ${visitorName} not found.`);
    }
    let visitor = this.visitors.get(visitorName);
    return visitor.visit(node);
  }

  registerVisitor(nodeNameOrVisitor: string|IASTVisitor, visitor?: IASTVisitor) {
    if (typeof nodeNameOrVisitor !== "string") {
      visitor = nodeNameOrVisitor;
      nodeNameOrVisitor = visitor.constructor.name;
    }
    this.visitors.set(nodeNameOrVisitor, visitor);
  }

  interpret() {
    let tree = this.parser.parse();
    return tree.visit(this);
    // return this.visit(tree);
  }
}

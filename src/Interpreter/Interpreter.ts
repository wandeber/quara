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
import ASTInterpreter from "./ASTInterpreter";
import ASTCharVisitor from "./ASTCharVisitor";
import ASTIfVisitor from "./ASTIfVisitor";





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
};

/*
"prop1" in sampleObject
"value 1" in sampleSimpleArray
1 in sampleSimpleArray[any].id
*/



export default class Interpreter extends ASTInterpreter {
  parser: Parser;

  showDebug: boolean;
  space: string = "";

  /**
   * Will be set to visitWithDebug or visitWithoutDebug depending on the value of showDebug.
   * @param {AST} node
   * @return {any}
   */
  visit: (node: AST) => any;

  /**
   * AST Interpreter.
   * @param {Parser} parser
   * @param {any} [variables = {}]
   * @param {Boolean} [showDebug = false]
   */
  constructor(parser: Parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;

    this.showDebug = showDebug;
    if (this.showDebug) {
      this.debug("Debug is enabled.");
      this.visit = this.visitWithDebug;
    }
    else {
      this.visit = this.visitWithoutDebug;
    }

    this.setVariables(DefaultVariables);
    if (variables) {
      this.setVariables(variables);
    }

    // TODO: Una opción para sacar esto de aquí es que se registren las clases Visitors después de
    //   ser definidas. Este constructor podría usar esos datos para registrar todos los visitors en
    //   bucle.
    this.registerVisitor("ASTAssign", new ASTAssignVisitor(this));
    this.registerVisitor("ASTBinaryOperator", new ASTBinaryOperatorVisitor(this));
    this.registerVisitor("ASTBoolean", new ASTBooleanVisitor(this));
    this.registerVisitor("ASTChar", new ASTCharVisitor(this));
    this.registerVisitor("ASTCompound", new ASTCompoundVisitor(this));
    this.registerVisitor("ASTConstantDeclaration", new ASTConstantDeclarationVisitor(this));
    this.registerVisitor("ASTFunctionCall", new ASTFunctionCallVisitor(this));
    this.registerVisitor("ASTNumber", new ASTNumberVisitor(this));
    this.registerVisitor("ASTString", new ASTStringVisitor(this));
    this.registerVisitor("ASTType", new ASTTypeVisitor(this));
    this.registerVisitor("ASTUnaryOperator", new ASTUnaryOperatorVisitor(this));
    this.registerVisitor("ASTVariableDeclaration", new ASTVariableDeclarationVisitor(this));
    this.registerVisitor("ASTVariable", new ASTVariableVisitor(this));
    this.registerVisitor("ASTIf", new ASTIfVisitor(this));
  }

  /**
   * Add variables to the global scope.
   * @param {any} variables
   */
  setVariables(variables: any) {
    Object.assign(this.globalScope, variables);
  }

  /**
   * Visit a node without showing debug information.
   * @param {AST} node
   * @return {any}
   */
  private visitWithoutDebug(node: AST) {
    let visitorName = node.constructor.name;
    if (!this.visitors.has(visitorName)) {
      throw new Error(`Visitor ${visitorName} not found.`);
    }
    let visitor = this.visitors.get(visitorName);
    return visitor.visit(node);
  }

  /**
   * Visit a node showing debug information.
   * @param {AST} node
   * @return {any}
   */
  private visitWithDebug(node: AST) {
    let prevSpace = this.space;
    if (this.showDebug) {
      this.space += "  ";
      console.log(this.space +" "+ node.constructor.name, node.toString());
    }

    let result = this.visitWithoutDebug(node);

    if (this.showDebug) {
      this.space = prevSpace;
    }

    return result;
  }

  /**
   * Parse and interpret the code.
   * @return {any}
   */
  interpret() {
    let tree = this.parser.parse();
    // console.log(tree);
    // return tree.accept(this);
    return this.visit(tree);
  }
}

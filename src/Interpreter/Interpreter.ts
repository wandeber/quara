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
import ASTWhileVisitor from "./ASTWhileVisitor";
import ASTAssign from "../ASTNodes/ASTAssign";
import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTBoolean from "../ASTNodes/ASTBoolean";
import ASTChar from "../ASTNodes/ASTChar";
import ASTCompound from "../ASTNodes/ASTCompound";
import ASTConstantDeclaration from "../ASTNodes/ASTConstantDeclaration";
import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
import ASTIf from "../ASTNodes/ASTIf";
import ASTNumber from "../ASTNodes/ASTNumber";
import ASTString from "../ASTNodes/ASTString";
import ASTType from "../ASTNodes/ASTType";
import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVariable from "../ASTNodes/ASTVariable";
import ASTVariableDeclaration from "../ASTNodes/ASTVariableDeclaration";
import ASTWhile from "../ASTNodes/ASTWhile";
import ASTTextBlock from "../ASTNodes/ASTTextBlock";
import ASTTextProcessor from "../ASTNodes/ASTTextProcessor";
import ASTTextBlockVisitor from "./ASTTextBlockVisitor";
import ASTTextProcessorVisitor from "./ASTTextProcessorVisitor";
import {IVisitorResult} from "./VisitorResult";





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
  print(arg: any) {
    console.log(arg);
  },
};


export default class Interpreter extends ASTInterpreter {
  parser: Parser;

  showDebug: boolean;
  space: string = "";

  /**
   * Will be set to visitWithDebug or visitWithoutDebug depending on the value of showDebug.
   * @param {AST} node
   * @return {any}
   */
  visit: (node: AST) => IVisitorResult;

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
    // Por otra parte, prefiero dejarlo así por dar la posibilidad de crear diferentes interpreters
    //   con diferentes visitors.
    this.registerVisitor(ASTAssign.name, new ASTAssignVisitor(this));
    this.registerVisitor(ASTBinaryOperator.name, new ASTBinaryOperatorVisitor(this));
    this.registerVisitor(ASTBoolean.name, new ASTBooleanVisitor(this));
    this.registerVisitor(ASTChar.name, new ASTCharVisitor(this));
    this.registerVisitor(ASTCompound.name, new ASTCompoundVisitor(this));
    this.registerVisitor(ASTConstantDeclaration.name, new ASTConstantDeclarationVisitor(this));
    this.registerVisitor(ASTFunctionCall.name, new ASTFunctionCallVisitor(this));
    this.registerVisitor(ASTNumber.name, new ASTNumberVisitor(this));
    this.registerVisitor(ASTString.name, new ASTStringVisitor(this));
    this.registerVisitor(ASTType.name, new ASTTypeVisitor(this));
    this.registerVisitor(ASTUnaryOperator.name, new ASTUnaryOperatorVisitor(this));
    this.registerVisitor(ASTVariableDeclaration.name, new ASTVariableDeclarationVisitor(this));
    this.registerVisitor(ASTVariable.name, new ASTVariableVisitor(this));
    this.registerVisitor(ASTIf.name, new ASTIfVisitor(this));
    this.registerVisitor(ASTWhile.name, new ASTWhileVisitor(this));
    this.registerVisitor(ASTTextProcessor.name, new ASTTextProcessorVisitor(this));
    this.registerVisitor(ASTTextBlock.name, new ASTTextBlockVisitor(this));
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
  private visitWithoutDebug(node: AST): IVisitorResult {
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
  private visitWithDebug(node: AST): IVisitorResult {
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
    let result = this.visit(tree);
    return result.value;
  }
}

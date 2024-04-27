import {Parser} from "../Parser";

// AST nodes:
import {Node} from "../ASTNodes/ASTNode";
import {Assign} from "../ASTNodes/Assign";
import {BinOperator} from "../ASTNodes/BinOperator";
import {Bool} from "../ASTNodes/Bool";
import {Char} from "../ASTNodes/Char";
import {Compound} from "../ASTNodes/Compound";
import {ConstDecl} from "../ASTNodes/ConstDecl";
import {FnDecl} from "../ASTNodes/FnDecl";
import {FnCall} from "../ASTNodes/FnCall";
import {If} from "../ASTNodes/If";
import {Num} from "../ASTNodes/Num";
import {Str} from "../ASTNodes/Str";
import {Type} from "../ASTNodes/Type";
import {UnaryOperator} from "../ASTNodes/UnaryOperator";
import {Variable} from "../ASTNodes/Variable";
import {VarDecl} from "../ASTNodes/VarDecl";
import {While} from "../ASTNodes/While";
import {TxtBlock} from "../ASTNodes/TxtBlock";
import {TxtProcessor} from "../ASTNodes/TxtProcessor";
import {Arr} from "../ASTNodes/Arr";
import {Obj} from "../ASTNodes/Obj";

// Visitors:
import {BoolVisitor} from "./BoolVisitor";
import {NumVisitor} from "./NumVisitor";
import {StrVisitor} from "./StrVisitor";
import {IVisitorResult} from "./VisitorResult";
import {UnaryOperatorVisitor} from "./UnaryOperatorVisitor";
import {BinOperatorVisitor} from "./BinOperatorVisitor";
import {FnDeclVisitor} from "./FnDeclVisitor";
import {FnCallVisitor} from "./FnCallVisitor";
import {AssignVisitor} from "./AssignVisitor";
import {VariableVisitor} from "./VariableVisitor";
import {TypeVisitor} from "./TypeVisitor";
import {VarDeclVisitor} from "./VarDeclVisitor";
import {ConstDeclVisitor} from "./ConstDeclVisitor";
import {CompoundVisitor} from "./CompoundVisitor";
import {ASTInterpreter} from "./ASTInterpreter";
import {CharVisitor} from "./CharVisitor";
import {IfVisitor} from "./IfVisitor";
import {WhileVisitor} from "./WhileVisitor";
import {TxtBlockVisitor} from "./TxtBlockVisitor";
import {TxtProcessorVisitor} from "./TxtProcessorVisitor";
import {ArrVisitor} from "./ArrVisitor";
import {ObjVisitor} from "./ObjVisitor";

import {DV} from "../globalScope";



export class Interpreter extends ASTInterpreter {
  parser: Parser;

  showDebug: boolean;
  space: string = "";

  /**
   * Will be set to visitWithDebug or visitWithoutDebug depending on the value of showDebug.
   * @param {Node} node
   * @return {any}
   */
  visit: (node: Node) => IVisitorResult;

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

    this.setVariables(DV);
    if (variables) {
      this.setVariables(variables);
    }

    // TODO: Una opción para sacar esto de aquí es que se registren las clases Visitors después de
    //   ser definidas. Este constructor podría usar esos datos para registrar todos los visitors en
    //   bucle.
    // Por otra parte, prefiero dejarlo así por dar la posibilidad de crear diferentes interpreters
    //   con diferentes visitors.
    this.visitors[Assign.name] = new AssignVisitor(this);
    this.visitors[BinOperator.name] = new BinOperatorVisitor(this);
    this.visitors[Bool.name] = new BoolVisitor(this);
    this.visitors[Char.name] = new CharVisitor(this);
    this.visitors[Compound.name] = new CompoundVisitor(this);
    this.visitors[ConstDecl.name] = new ConstDeclVisitor(this);
    this.visitors[FnDecl.name] = new FnDeclVisitor(this);
    this.visitors[FnCall.name] = new FnCallVisitor(this);
    this.visitors[Num.name] = new NumVisitor(this);
    this.visitors[Str.name] = new StrVisitor(this);
    this.visitors[Type.name] = new TypeVisitor(this);
    this.visitors[UnaryOperator.name] = new UnaryOperatorVisitor(this);
    this.visitors[VarDecl.name] = new VarDeclVisitor(this);
    this.visitors[Variable.name] = new VariableVisitor(this);
    this.visitors[If.name] = new IfVisitor(this);
    this.visitors[While.name] = new WhileVisitor(this);
    this.visitors[TxtProcessor.name] = new TxtProcessorVisitor(this);
    this.visitors[TxtBlock.name] = new TxtBlockVisitor(this);
    this.visitors[Arr.name] = new ArrVisitor(this);
    this.visitors[Obj.name] = new ObjVisitor(this);
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
   * @param {Node} node
   * @return {any}
   */
  private visitWithoutDebug(node: Node): IVisitorResult {
    let result = this.visitors[node.constructor.name].visit(node);
    // TODO: Throw an error if the visitor is undefined, null or NaN?
    if (typeof result.value === "undefined" || result.value == null) {
      result.value = undefined;
      result.output = "";
    }
    else if (Number.isNaN(result.value)) {
      result.output = "";
    }
    else if (result.value === Infinity) {
      result.output = "∞";
    }
    else if (result.value === -Infinity) {
      result.output = "-∞";
    }
    return result;
  }

  /**
   * Visit a node showing debug information.
   * @param {Node} node
   * @return {any}
   */
  private visitWithDebug(node: Node): IVisitorResult {
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

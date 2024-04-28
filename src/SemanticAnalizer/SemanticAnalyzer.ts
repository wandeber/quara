// import {ASTVisitor} from "./ASTVisitor";
import {IASTEngine, VisitorMap} from "../ASTVisitor";

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
import {CharVisitor} from "./CharVisitor";
import {IfVisitor} from "./IfVisitor";
import {WhileVisitor} from "./WhileVisitor";
import {TxtBlockVisitor} from "./TxtBlockVisitor";
import {TxtProcessorVisitor} from "./TxtProcessorVisitor";
import {ArrVisitor} from "./ArrVisitor";
import {ObjVisitor} from "./ObjVisitor";

export class SemanticAnalizer implements IASTEngine {
  visitors: VisitorMap = {};
  showDebug: boolean;
  space: string = "";

  /**
   * AST semantic analyzer.
   * @param {any} [variables = {}]
   * @param {Boolean} [showDebug = false]
   */
  constructor(showDebug = false) {
    this.showDebug = showDebug;
    if (this.showDebug) {
      this.debug("Debug is enabled.");
      this.visit = this.visitWithDebug;
    }
    else {
      this.visit = this.visitWithoutDebug;
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

  error(message: string, me?: any) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Error during semantic analysis.");
  }

  debug(message = "") {
    console.log("-- Semantic analizer: "+ message);
  }

  /**
   * Will be set to visitWithDebug or visitWithoutDebug depending on the value of showDebug.
   * @param {Node} node
   * @return {any}
   */
  visit: (node: Node) => void;

  /**
   * Visit a node without showing debug information.
   * @param {Node} node
   */
  private visitWithoutDebug(node: Node) {
    this.visitors[node.constructor.name]?.visit(node);
  }

  /**
   * Visit a node showing debug information.
   * @param {Node} node
   */
  private visitWithDebug(node: Node) {
    let prevSpace = this.space;
    if (this.showDebug) {
      this.space += "  ";
      console.log(this.space +" "+ node.constructor.name, node.toString());
    }

    this.visitWithoutDebug(node);

    if (this.showDebug) {
      this.space = prevSpace;
    }
  }

  /**
   * TODO: Remove this method.
   * Analyze the AST tree.
   * @param {any} astTree
   */
  process(astTree = {}) {
    this.visit(astTree);
  }
}

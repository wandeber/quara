import ASTAssign from "../ASTNodes/ASTAssign";
import ASTVisitor from "./ASTVisitor";
import {TT} from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";



export default class ASTAssignVisitor extends ASTVisitor {
  visit(node: ASTAssign): IVisitorResult {
    // console.log("--");
    // console.log("node left", node.left);
    let parent = this.interpreter.globalScope;
    let {name} = node.left as IASTWithName;
    let leftResult, rightValue, value;
    if (name) {
      // if (typeof this.interpreter.globalScope[name] == "undefined") {
      //   this.interpreter.error("La variable "+ name +" no ha sido declarada.");
      // }
      leftResult = this.interpreter.visit(node.left) as any;
    }
    else if (TT.Dot == (node.left as any).token.type) {
      let left = (node.left as any).left;
      name = (node?.left as any)?.right?.name;
      leftResult = this.interpreter.visit(left) as any;
      parent = leftResult.value;
    }
    else if (
      [
        TT.BracketOpen,
        TT.CurlyOpen,
      ].includes((node.left as any).token.type)
    ) {
      let tokenType = (node.left as any).token.type;
      let left = (node.left as any).left;
      let right = (node.left as any).right;
      leftResult = this.interpreter.visit(left) as any;
      let index = this.interpreter.visit(right) as any;
      parent = leftResult.value;
      name = index.value;
      if (tokenType == TT.BracketOpen) {
        if (!Array.isArray(parent)) {
          this.interpreter.error("Variable "+ name +" is not an array.");
        }
      }
      else if (tokenType == TT.CurlyOpen) {
        if (typeof parent !== "object"/* || Array.isArray(parent)*/) {
          this.interpreter.error("Variable "+ name +" is not an objet.");
        }
      }
    }
    else {
      // console.log("--");
      // console.log("node", node);
      this.interpreter.error("You can't assign to this.", node.left);
    }

    // let leftValue = node.left?.accept(this.interpreter);
    // let rightValue = node.right?.accept(this.interpreter);
    let rightResult = this.interpreter.visit(node.right) as any;
    // console.log("leftResult", leftResult);
    let leftValue = leftResult.value;
    if (typeof rightResult !== "undefined") {
      rightValue = rightResult.value;
    }

    switch (node.operator.type) {
    case TT.OpAssign:
      value = rightValue;
      break;
    case TT.OpPlusAssign:
      value = leftValue + rightValue;
      break;
    case TT.OpMinusAssign:
      value = leftValue - rightValue;
      break;
    case TT.OpTimesAssign:
      value = leftValue * rightValue;
      break;
    case TT.OpDivAssign:
      value = leftValue / rightValue;
      break;
    case TT.OpModAssign:
      value = leftValue % rightValue;
      break;
    case TT.OpPowAssign:
      value = leftValue ** rightValue;
      break;
    }

    parent[name] = value;
    return {
      value: parent[name],
      // output: undefined,
    };
  }
}

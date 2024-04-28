import {Assign} from "../ASTNodes/Assign";
import {ASTVisitor} from "./ASTInterpreter";
import {TT} from "../TokenTypes";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";



export class AssignVisitor extends ASTVisitor {
  visit(node: Assign, scope: Scope): IVisitorResult {
    // console.log("--");
    // console.log("node left", node.left);
    let parent;
    let {name} = node.left as INodeWithName;
    let leftResult, rightValue, value;
    if (name) {
      // if (typeof this.interpreter.globalScope[name] == "undefined") {
      //   this.interpreter.error("La variable "+ name +" no ha sido declarada.");
      // }
      leftResult = this.engine.visit(node.left, scope) as any;
    }
    else if (TT.Dot == (node.left as any).token.type) {
      let left = (node.left as any).left;
      name = (node?.left as any)?.right?.name;
      leftResult = this.engine.visit(left, scope) as any;
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
      leftResult = this.engine.visit(left, scope) as any;
      let index = this.engine.visit(right, scope) as any;
      parent = leftResult.value;
      name = index.value;
      if (tokenType == TT.BracketOpen) {
        if (!Array.isArray(parent)) {
          this.engine.error("Variable "+ name +" is not an array.");
        }
      }
      else if (tokenType == TT.CurlyOpen) {
        if (typeof parent !== "object"/* || Array.isArray(parent)*/) {
          this.engine.error("Variable "+ name +" is not an objet.");
        }
      }
    }
    else {
      // console.log("--");
      // console.log("node", node);
      this.engine.error("You can't assign to this.", node.left);
    }

    // let leftValue = node.left?.accept(this.interpreter);
    // let rightValue = node.right?.accept(this.interpreter);
    let rightResult = this.engine.visit(node.right, scope) as any;
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

    if (parent) {
      parent[name] = value;
    }
    else {
      scope.insert(name, value);
    }
    return {
      value,
      // output: undefined,
    };
  }
}

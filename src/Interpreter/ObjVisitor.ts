import {Variable} from "../ASTNodes/Variable";
import {Obj} from "../ASTNodes/Obj";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";



export class ObjVisitor extends ASTVisitor {
  visit(node: Obj, scope: Scope): IVisitorResult {
    let result: any = {};
    // let output = "";

    node.members.forEach((value, key) => {
      // console.log(key, value);
      // TODO: Clarify why this is necessary
      let keyResult = (key as Variable).name || this.engine.visit(key, scope) as unknown as string;
      let valueResult = this.engine.visit(value, scope);
      result[keyResult] = valueResult.value;
    });

    return {
      value: result,
      output: result,
    };
  }
}

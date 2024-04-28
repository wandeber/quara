import {Variable} from "../ASTNodes/Variable";
import {Obj} from "../ASTNodes/Obj";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";



export class ObjVisitor extends ASTVisitor {
  visit(node: Obj): IVisitorResult {
    let result: any = {};
    // let output = "";

    node.members.forEach((value, key) => {
      // console.log(key, value);
      let keyResult = (key as Variable).name || this.engine.visit(key) as unknown as string;
      let valueResult = this.engine.visit(value);
      result[keyResult] = valueResult.value;
    });

    return {
      value: result,
      output: result,
    };
  }
}

import ASTVariable from "../ASTNodes/ASTVariable";
import ASTObject from "../ASTNodes/ASTObject";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTObjectVisitor extends ASTVisitor {
  visit(node: ASTObject): IVisitorResult {
    let result: any = {};
    // let output = "";

    node.members.forEach((value, key) => {
      // console.log(key, value);
      let keyResult = (key as ASTVariable).name || this.interpreter.visit(key) as unknown as string;
      let valueResult = this.interpreter.visit(value);
      result[keyResult] = valueResult.value;
    });

    return {
      value: result,
      output: result,
    };
  }
}

import {Arr} from "../ASTNodes/Arr";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";



export class ArrVisitor extends ASTVisitor {
  visit(node: Arr): IVisitorResult {
    let result: any = [];
    let output = "";

    for (let child of node.children) {
      // result.push(child.accept(this.interpreter));
      let childResult = this.engine.visit(child);
      result.push(childResult.value);
      if (childResult.output) {
        output += childResult.output;
      }
    }

    return {
      value: result,
      output: output,
    };
  }
}

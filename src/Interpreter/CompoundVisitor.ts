import {Compound} from "../ASTNodes/Compound";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from './Scope';
import {IVisitorResult} from "./VisitorResult";



export class CompoundVisitor extends ASTVisitor {
  visit(node: Compound, scope: Scope): IVisitorResult {
    let result: any = [];
    let output = "";

    for (let child of node.children) {
      // result.push(child.accept(this.interpreter));
      let childResult = this.engine.visit(child, scope);
      result.push(childResult);
      if (childResult.output) {
        output += childResult.output;
      }
    }

    if (result.length > 0) {
      result = result[result.length - 1].value;
    }
    else {
      result = undefined;
    }

    return {
      value: result,
      output: output,
    };
  }
}

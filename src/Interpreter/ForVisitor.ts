import {For} from "../ASTNodes/For";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";




export class ForVisitor extends ASTVisitor {
  visit(node: For, scope: Scope): IVisitorResult {
    let result, value;
    let output = "";


    let newScope = scope.getChildScope("for");
    let iterableResult = this.engine.visit(node.iterable, newScope);
    if (!Array.isArray(iterableResult.value)) {
      throw new Error("For iterable must be an array");
    }
    for (let i = 0; i < iterableResult.value.length; i++) {
      if (typeof node.variable !== "undefined") {
        newScope.insert(node.variable.name, iterableResult.value[i]);
      }
      if (typeof node.index !== "undefined") {
        newScope.insert(node.index.name, i);
      }
      if (node.body) {
        let bodyScope = newScope.getChildScope("for");
        result = this.engine.visit(node.body, bodyScope);
        if (result) {
          value = result.value;
        }
        if (result.output) {
          output += result.output;
        }
      }
    }
    return {
      value,
      output,
    };
  }
}

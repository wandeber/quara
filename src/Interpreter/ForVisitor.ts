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
    if (typeof iterableResult.value !== "object" && typeof iterableResult.value !== "string") {
      throw new Error("Not an iterable object");
    }
    let len = 0;
    let keys: string[] = [];
    if (Array.isArray(iterableResult.value) || typeof iterableResult.value === "string") {
      len = iterableResult.value.length;
    }
    else {
      keys = Object.keys(iterableResult.value);
      len = keys.length;
    }
    for (let i = 0; i < len; i++) {
      if (typeof node.variable !== "undefined") {
        if (Array.isArray(iterableResult.value) || typeof iterableResult.value === "string") {
          newScope.insert(node.variable.name, iterableResult.value[i]);
        }
        else {
          newScope.insert(node.variable.name, (iterableResult.value as any)[keys[i]]);
        }
      }
      if (typeof node.index !== "undefined") {
        if (Array.isArray(iterableResult.value) || typeof iterableResult.value === "string") {
          newScope.insert(node.index.name, i);
        }
        else {
          newScope.insert(node.index.name, keys[i]);
        }
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

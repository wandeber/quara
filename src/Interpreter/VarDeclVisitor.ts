import {BinOperator} from "../ASTNodes/BinOperator";
import {VarDecl} from "../ASTNodes/VarDecl";
import {ASTVisitor} from "./ASTInterpreter";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";



export class VarDeclVisitor extends ASTVisitor {
  visit(node: VarDecl, scope: Scope): IVisitorResult {
    // let type = "any"; // Default any or deduce from value?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    for (let child of node.children) {
      // console.log("child", child);
      let childBinaryOperator: BinOperator = child as BinOperator;
      name = (childBinaryOperator.left as INodeWithName)?.name;
      if (!name) {
        ({name} = child as INodeWithName); // TODO: ¿Esto es necesario?
      }

      if (typeof scope.lookup(name) != "undefined") {
        throw new Error(`Variable ${name} already declared.`);
      }

      // Declaration...
      scope.insert(name, null);

      // Maybe initialization...
      // child.accept(this.interpreter);
      this.engine.visit(child, scope);
    }

    return {
      value: name ? scope.getMemberValue(name) : undefined,
      // output: undefined,
    };
  }
}

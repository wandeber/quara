import {INodeWithValue} from "../ASTNodes/ASTNode";
import {Type} from "../ASTNodes/Type";
import {ASTVisitor} from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export class TypeVisitor extends ASTVisitor {
  visit(node: Type): IVisitorResult {
    return {
      value: (node as INodeWithValue).value,
      // output: undefined,
    };
  }
}

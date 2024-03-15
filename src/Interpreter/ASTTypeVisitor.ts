import {IASTWithValue} from "../ASTNodes/AST";
import ASTType from "../ASTNodes/ASTType";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTTypeVisitor extends ASTVisitor {
  visit(node: ASTType): IVisitorResult {
    return {
      value: (node as IASTWithValue).value,
      // output: undefined,
    };
  }
}

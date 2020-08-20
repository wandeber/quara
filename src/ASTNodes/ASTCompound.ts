import AST from "./AST";
import ASTVisitor from "./ASTVisitor";





export interface ASTCompoundVisitor extends ASTVisitor {
  visitASTCompound(node: ASTCompound): any;
}

export default class ASTCompound extends AST {
  children: AST[] = [];



  visit(nodeVisitor: ASTCompoundVisitor) {
    return nodeVisitor.visitASTCompound(this);
  }
}

import AST from "./AST";
import ASTVisitor from "./ASTVisitor";





export default class ASTCompound extends AST {
  children: AST[] = [];



  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTCompound(this);
  }
}

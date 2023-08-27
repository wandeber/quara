import AST from "./AST";





export default class ASTCompound extends AST {
  children: AST[] = [];

  toString() {
    return this.children.join(", ");
  }
}

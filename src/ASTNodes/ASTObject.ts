import AST from "./AST";
import ASTVariable from "./ASTVariable";





export default class ASTObject extends AST {
  members = new Map<AST | ASTVariable, AST>();
}

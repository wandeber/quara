import AST from "./AST";





export default class ASTFunctionCall extends AST {
  constructor(public left: any, public right: any) {
    super();
    this.left = left; // member
    this.right = right; // params
  }
}

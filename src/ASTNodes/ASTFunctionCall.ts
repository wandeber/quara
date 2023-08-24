import AST, {IASTNode} from "./AST";





export default class ASTFunctionCall extends AST {
  constructor(public left: IASTNode, public right: IASTNode[]) {
    super();
    this.left = left; // member
    this.right = right; // params
  }
}

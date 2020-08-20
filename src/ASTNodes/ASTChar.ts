import AST, {ASTWithValue} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export interface ASTCharVisitor extends ASTVisitor {
  visitASTChar(node: ASTChar): any;
}

export default class ASTChar extends AST implements ASTWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }



  visit(nodeVisitor: ASTCharVisitor) {
    return nodeVisitor.visitASTChar(this);
  }
}

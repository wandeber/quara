import AST, {ASTWithValue} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export interface ASTStringVisitor extends ASTVisitor {
  visitASTString(node: ASTString): any;
}

export default class ASTString extends AST implements ASTWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }



  visit(nodeVisitor: ASTStringVisitor) {
    return nodeVisitor.visitASTString(this);
  }
}

import AST, {ASTWithValue} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";






export interface ASTBooleanVisitor extends ASTVisitor {
  visitASTBoolean(node: ASTBoolean): any;
}

export default class ASTBoolean extends AST implements ASTWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }



  visit(nodeVisitor: ASTBooleanVisitor) {
    return nodeVisitor.visitASTBoolean(this);
  }
}

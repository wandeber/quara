import AST, {ASTWithValue} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export interface ASTTypeVisitor extends ASTVisitor {
  visitASTType(node: ASTType): any;
}

export default class ASTType extends AST implements ASTWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }



  visit(nodeVisitor: ASTTypeVisitor) {
    return nodeVisitor.visitASTType(this);
  }
}

import AST, {ASTWithName} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export interface ASTVariableVisitor extends ASTVisitor {
  visitASTVariable(node: ASTVariable): any;
}

export default class ASTVariable extends AST implements ASTWithName {
  name: string;

  constructor(public token: Token) {
    super();
    this.name = token.value as string; // Change by this.value?
  }



  visit(nodeVisitor: ASTVariableVisitor) {
    return nodeVisitor.visitASTVariable(this);
  }
}

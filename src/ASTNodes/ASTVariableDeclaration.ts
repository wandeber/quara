import {IASTWithValue} from "./AST";
import ASTCompound from "./ASTCompound";





export default class ASTVariableDeclaration extends ASTCompound {
  constructor(public typeNode: IASTWithValue = null) {
    super();
  }

  toString() {
    return String("var "+ this.typeNode?.value +" "+ this.children?.join(" "));
  }
}

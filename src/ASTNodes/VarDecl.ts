import {INodeWithValue} from "./ASTNode";
import {Compound} from "./Compound";





export class VarDecl extends Compound {
  constructor(public typeNode?: INodeWithValue) {
    super();
  }

  toString() {
    return String("var "+ this.typeNode?.value +" "+ this.children?.join(" "));
  }
}

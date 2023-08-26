import ASTCompound from "./ASTCompound";





export default class ASTVariableDeclaration extends ASTCompound {
  constructor(public typeNode: any = null) {
    super();
  }

  toString() {
    return String(this.typeNode);
  }
}

import ASTCompound from "./ASTCompound";





export default class ASTVariableDeclaration extends ASTCompound {
  typeNode: any;

  constructor(typeNode: any = null) {
    super();
    this.typeNode = typeNode;
  }
}

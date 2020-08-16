import ASTCompound from "./ASTCompound";





export default class ASTConstantDeclaration extends ASTCompound {
  constructor(public typeNode: any = null) {
    super();
  }
}

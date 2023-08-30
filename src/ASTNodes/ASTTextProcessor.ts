import Token from "../Token";
import ASTCompound from "./ASTCompound";





export default class ASTtextProcessor extends ASTCompound {
  constructor(
    public token: Token,
  ) {
    super();
  }
}

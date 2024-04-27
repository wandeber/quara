import {Token} from "../Token";
import {Node} from "./ASTNode";
import {Compound} from "./Compound";
import {Variable} from "./Variable";





export class FnDecl extends Node {
  constructor(
    public token: Token,
    public name: Variable,
    public params: Node[],
    public body: Compound,
  ) {
    super();
  }

  toString() {
    return String("fn "+ this.name +"("+ this.params.join(", ") +")");
  }
}

import {Token} from "../Token";
import {Node, INodeWithName} from "./ASTNode";





export class Variable extends Node implements INodeWithName {
  declare name: string;

  constructor(public token: Token) {
    super();
    this.name = token.value as string; // Change by this.value?
  }

  toString() {
    return String(this.name);
  }
}

import {Node, INodeWithValue} from "./ASTNode";
import {Token} from "../Token";



export abstract class WithValue extends Node implements INodeWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }

  toString() {
    return String(this.value);
  }
}

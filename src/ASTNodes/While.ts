import {Node, INode, INodeWithToken} from "./ASTNode";
import {Token} from "../Token";
import {Compound} from "./Compound";





export class While extends Node implements INodeWithToken {
  constructor(
    public token: Token,
    public condition: INode,
    public body?: INode|Compound,
  ) {
    super();
  }
}

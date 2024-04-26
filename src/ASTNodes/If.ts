import {Token} from "../Token";
import {Node, INode, INodeWithToken} from "./ASTNode";
import {Compound} from "./Compound";





export class If extends Node implements INodeWithToken {
  constructor(
    public token: Token,
    public condition: INode,
    public ifTrue: INode|Compound,
    public ifFalse?: INode|If|Compound,
  ) {
    super();
  }
}

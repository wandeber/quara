import {Node, INode, INodeWithToken} from "./ASTNode";
import {Token} from "../Token";
import {Compound} from "./Compound";
import {Variable} from "./Variable";





export class For extends Node implements INodeWithToken {
  constructor(
    public token: Token,
    public variable: Variable,
    public index: Variable,
    public iterable: INode,
    public body?: INode|Compound,
  ) {
    super();
  }
}

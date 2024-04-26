import {Node} from "./ASTNode";
import {Variable} from "./Variable";





export class Obj extends Node {
  members = new Map<Node | Variable, Node>();
}

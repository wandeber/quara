import {Node, INode, INodeWithValue} from "./ASTNodes/ASTNode";

export interface VisitorMap {
  [key: string]: IASTVisitor;
}

export interface IASTEngine {
  visitors: VisitorMap;
  error(message: string, me?: any): void;
  debug(message?: string): void;
  visit(node: Node, ...args: any): any;
}

export interface IASTVisitor {
  engine: IASTEngine;
  visit(node: Node, ...args: any): any;
}

export abstract class ASTVisitor implements IASTVisitor {
  public engine: IASTEngine;

  constructor(engine: IASTEngine) {
    this.engine = engine;
  }

  abstract visit(node: INode|INodeWithValue, ...args: any): any;
}

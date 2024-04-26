import {Token} from "../Token";



export interface INode {
  toString(): string;
}

export class Node implements INode {
  toString() {
    return this.constructor.name;
  }
}


export interface INodeWithToken extends INode {
  token: Token;
}

export interface INodeWithValue extends INode {
  value: string|number|boolean;
}

export interface INodeWithName extends INode {
  name: string;
}

export interface INodeWithChildren extends INode {
  children: Node[];
}

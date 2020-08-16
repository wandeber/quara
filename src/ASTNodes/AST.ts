import Token from "../Token";





export interface ASTWithToken {
  token: Token;
}

export interface ASTWithValue {
  value: string|number|boolean;
}

export interface ASTWithName {
  name: string;
}

export interface ASTWithChildren {
  children: AST[];
}



export default class AST {}

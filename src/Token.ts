import {TT} from "./TokenTypes";





export class Token {
  static readonly Types = TT;

  constructor(public type: any, public value: string|boolean|number) {
    // token type: IntegerConstant, OpPlus, or EoF
    this.type = type;
    // token value: 0, 1, 2. 3, 4, 5, 6, 7, 8, 9, '+', or None
    this.value = value;
  }

  /**
   * String representation of the class instance.
   * Examples:
   * Token(IntegerConstant, 3)
   * Token(OpPlus '+')
   * @return {string}
   */
  toString() {
    return `Token(${this.type}, ${this.value})`;
  }
}

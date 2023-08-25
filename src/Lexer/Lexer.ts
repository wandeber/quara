

import {Operators} from "./Operators";
import {ReservedKeywords} from "./ReservedKeywords";
import Token from "../Token";
import TokenTypes from "../TokenTypes";
import Types from "../helpers/BLib/Types";
import Validation from "./Validation";





/*
int holaMundo(string algo, integer algo) {}
its internal name will be "holaMundo(string, integer)"

int (string algo, integer algo) => {}
[type] [name] ([ [type] <name>[, [type] <name>] ]) [=>] {}


Permitir "2a" -> "a" es un nombre de variable. Se interpretará como "(2 * a)".
Permitir "2a b c" -> "a", "b" y "c" son nombres de variable. Se interpretará como "(2 * a * b * c)".
3 * 2a b -> 3 * (2 * a * b)
*/

/**
 * Related definitions:
 * - Token: An object that has a type and a value. For example, +, -, * ans / are different tokens
 *   of type Operator.
 * - Lexical anlysis: The process of breaking the input string into tokens.
 * - Lexical analyzer, tokenizer, lexer, scanner: The part of the interpreter that does the lexical
 *   analysis.
 * - Lexeme: A sequence of characters that form a token.
 */
export default class Lexer {
  pos = 0;

  currentToken?: Token = null;

  currentChar?: string = null;

  showDebug = false;

  constructor(public text?: string) {
    if (text) {
      this.setText(text);
    }
  }

  public setText(text: string) {
    this.text = text;
    this.pos = 0;
    this.currentToken = null;
    this.currentChar = null;
    this.getCurrentChar();
  }



  error(message = "", me: any = null) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Invalid character");
  }

  debug(message = "") {
    if (this.showDebug) {
      console.log("-- Lexer: "+ message);
      console.log("  pos:           ", this.pos);
      console.log("  current char:  ", this.currentChar);
      // if (this.currentToken) {
      //   console.log("  current token: ", this.currentToken.value);
      // }
    }
  }



  getCurrentChar() {
    if (this.pos < this.text.length) {
      this.currentChar = this.text[this.pos];
    }
    else {
      this.currentChar = null;
    }
  }

  peek(advance = 1): string|null {
    let peekPos = this.pos + advance;
    if (peekPos < this.text.length) {
      return this.text[peekPos];
    }
    return null;
  }

  advance(advance = 1) {
    this.pos += advance;
    this.getCurrentChar();
  }

  goToPosition(pos: number) {
    this.pos = pos;
    this.getCurrentChar();
  }

  skipSpaces() {
    while (this.currentChar == " ") {
      this.advance();
    }
  }

  skipLineComment() {
    this.advance(2); // Skips //,
    while (this.currentChar !== null && this.currentChar != "\n") {
      this.advance();
    }
  }

  skipBlockComment() {
    this.advance(2); // Skips /*.
    while (this.currentChar !== null && (this.currentChar != "*" || this.peek() != "/")) {
      this.advance();
    }
    this.advance(2); // Skips */,
  }

  getString(): string {
    let str = "";
    this.advance(); // Skip " opening.
    while (this.currentChar != "\"") {
      str += this.currentChar;
      this.advance();
    }
    this.advance(); // Skip " closure.
    return str;
  }

  getNumber(): string|null {
    let posAtStart = this.pos;
    let number = "";
    // let dots = 0;
    while (
      this.currentChar == "."
      || Types.isInteger(this.currentChar)
    ) {
      // if (this.currentChar == '.') {
      //   dots++;
      // }
      number += String(this.currentChar);
      this.advance();
    }

    if (!Types.isNumber(number)) {
      number = null;
      this.goToPosition(posAtStart);
    }

    return number;
  }

  /**
   * Obtiene una cambinación de los siguientes caracteres a partir de this.text[this.pos] si
   * coinciden con alguno de los valores de allowedValues. Para buscar, esta funcián irá
   * comparando caracter a caracter con todos los valores disponibles para descartar los que no
   * coincidan. Se da prioridad a coincidencias largas. Se intentará devolver == antes que =. Es
   * decir, si se busca uno de los siguientes elementos: ["==", "="], y el texto es "==", se
   * devolverá "==", omitiendo la primera coincidencia con "=" por ser más corta.
   * @param {*} allowedValues
   * @return {string|boolean}
   */
  getCoincidence(allowedValues: string[]): string {
    let currentValue = "";

    const filterValues = (index: number, charToCheck: string): boolean => {
      let remainingAllowedValues = []; // Will contain only operators that match the current operator.

      for (let value of allowedValues) {
        if (value.length > index && charToCheck == value[index]) {
          remainingAllowedValues.push(value);
        }
      }

      if (remainingAllowedValues.length > 0) {
        allowedValues = remainingAllowedValues;
        return true;
      }

      return false;
    };

    /* If current character match with any value in the position it would have in case of add it
    to currentValue, adds it to currentValue and advance to the next character. */
    while (filterValues(currentValue.length, this.currentChar)) {
      currentValue += String(this.currentChar);
      this.advance();
    }

    return currentValue;
  }

  id(): Token {
    let result = "";
    while (this.currentChar !== null && Validation.isValidVariableName(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    if (ReservedKeywords.get(result)) {
      return ReservedKeywords.get(result);
    }
    return new Token(TokenTypes.Id, result);
  }

  getOperator() {
    let operatorKeys = Array.from(Operators.keys());
    let currentOperatorKey = this.getCoincidence(operatorKeys);
    if (Operators.get(currentOperatorKey)) {
      return Operators.get(currentOperatorKey);
    }
    return null;
  }

  /**
   * Lexical analyzer (also known as scanner or tokenizer)
   *
   * This method is responsible for breaking a sentence
   * apart into tokens. One token at a time.
   * @param {boolean} skipSpaces
   * @return {Token|null}
   */
  getNextToken(skipSpaces = true): Token|null {
    let token = null;

    /* is this.pos index past the end of the this.text ?
    if so, then return EoF token because there is no more
    input left to convert into tokens */
    if (this.currentChar === null) {
      return new Token(TokenTypes.EoF, null);
    }

    if (this.currentChar === " ") {
      if (skipSpaces) {
        this.skipSpaces();
        return this.getNextToken(skipSpaces);
      }

      token = new Token(TokenTypes.Space, " ");
      this.advance();
      return token;
    }

    // Skip block comment:
    if (this.currentChar == "/" && this.peek() == "*") {
      this.skipBlockComment();
      return this.getNextToken(skipSpaces);
    }
    // Skip line comment:
    if (this.currentChar == "/" && this.peek() == "/") {
      this.skipLineComment();
      return this.getNextToken(skipSpaces);
    }

    // Strings:
    if (this.currentChar == "\"") {
      let str = this.getString();
      if (typeof str !== "undefined") {
        return new Token(TokenTypes.StringConstant, str);
      }
    }

    // If point or digit, gets a number, integer or float:
    if (this.currentChar == "." || Types.isInteger(this.currentChar)) {
      let number = this.getNumber();
      if (number) {
        if (Types.isInteger(number)) {
          return new Token(TokenTypes.IntegerConstant, parseInt(number));
        }
        return new Token(TokenTypes.DecimalConstant, parseFloat(number));
      }
    }

    // Operators:
    let operator = this.getOperator();
    if (operator) { // Not null.
      return operator;
    }

    // Reserved keywords and variable names:
    if (Types.isAlpha(this.currentChar) || this.currentChar == "_" || this.currentChar == "$") {
      return this.id();
    }

    this.error();
    return null;
  }
}

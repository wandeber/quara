import {OP} from "./Operators";
import {RK} from "./ReservedKeywords";
import {Token} from "../Token";
import {TT} from "../TokenTypes";
import {Types} from "../helpers/BLib/Types";
import {Validation} from "./Validation";


class LexerError extends Error {
  constructor(
    public character: string,
    public line: number,
    public position: number,
    public nearCode: string,
  ) {
    super(
      "Ivalid charachter \""+ character +"\""
      +" found in line "+ line
      +" at position "+ position
      +". Near of: "+ nearCode,
    );
  }
}


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
export class Lexer {
  pos = 0;
  line = 0;
  lineStartPos = 0;

  currentChar: string = "";
  private inTextBlock = false;
  private inTextSection = false;

  showDebug = false;

  constructor(public text: string = "") {
    this.setText(text);
  }

  public setText(text: string) {
    this.text = text;
    this.pos = 0;
    this.currentChar = "";
    this.getCurrentChar();
  }


  createError(): LexerError {
    let error = new LexerError(
      String(this.currentChar),
      this.line + 1,
      this.getLinePosition() + 1,
      this.text.slice(
        this.pos - 10 < 0 ? 0 : this.pos - 10,
        this.pos + 10 > this.text.length ? this.text.length : this.pos + 10,
      ),
    );
    return error;
  }

  error(message = "", me: any = null): LexerError {
    if (message) {
      console.log(message, me);
    }
    throw this.createError();
  }

  debug(message = "") {
    if (this.showDebug) {
      console.log("-- Lexer: "+ message);
      console.log("  pos:           ", this.pos);
      console.log("  current char:  ", this.currentChar);
    }
  }

  getLinePosition() {
    return this.pos - this.lineStartPos;
  }

  getCurrentChar() {
    if (this.pos < this.text.length) {
      this.currentChar = this.text[this.pos];
    }
    else {
      this.currentChar = "";
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
    while ([" ", "\n", "\r", "\t"].includes(this.currentChar)) {
      this.advance();
    }
  }

  skipLineComment() {
    this.advance(2); // Skips //,
    while (this.currentChar && this.currentChar != "\n") {
      this.advance();
    }
  }

  skipBlockComment() {
    this.advance(2); // Skips /*.
    while (this.currentChar && (this.currentChar != "*" || this.peek() != "/")) {
      this.advance();
    }
    this.advance(2); // Skips */,
  }

  getString(): string {
    let str = "";
    this.advance(); // Skip " opening.
    while (this.currentChar != "\"") {
      if (this.currentChar == "\\") {
        str += this.getEscapedChar();
      }
      else {
        str += this.currentChar;
      }
      this.advance();
    }
    this.advance(); // Skip " closure.
    return str;
  }

  getNumber(): string|undefined {
    let posAtStart = this.pos;
    let number = "";
    // let dots = 0;
    while (
      // Ignores two points in a row (..) because that is a range operator.
      (
        this.currentChar == "."
        && this.peek() != "."
      )
      || Types.isInteger(this.currentChar)
    ) {
      // if (this.currentChar == '.') {
      //   dots++;
      // }
      number += String(this.currentChar);
      this.advance();
    }

    if (!Types.isNumber(number)) {
      this.goToPosition(posAtStart);
      return undefined;
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
    while (this.currentChar && Validation.isValidVariableName(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return RK.get(result)
    || OP.get(result)
    || new Token(TT.Id, result);
  }

  getOperator() {
    let operatorKeys = Array.from(OP.keys());
    let currentOperatorKey = this.getCoincidence(operatorKeys);
    return OP.get(currentOperatorKey);
  }

  getEscapedChar() {
    let char = "";
    this.advance();
    // ignore all lint rules in this line
    if (this.currentChar == "n") {
      char += "\n";
    }
    else if (this.currentChar == "r") {
      char += "\r";
    }
    else if (this.currentChar == "t") {
      char += "\t";
    }
    else {
      char += this.currentChar;
    }
    return char;
  }

  /**
   * Lexical analyzer (also known as scanner or tokenizer)
   *
   * This method is responsible for breaking a sentence
   * apart into tokens. One token at a time.
   * @param {boolean} skipSpaces
   * @return {Token|null}
   */
  getNextToken(skipSpaces = true): Token {
    let token = null;

    /* is this.pos index past the end of the this.text ?
    if so, then return EoF token because there is no more
    input left to convert into tokens */
    if (!this.currentChar) {
      return new Token(TT.EoF, "");
    }

    if (!this.inTextBlock) {
      if (this.currentChar == "`") {
        this.inTextBlock = true;
        this.inTextSection = true;
        return this.getOperator() || (() => {throw this.createError();})();
      }
    }
    else {
      if (this.currentChar == "`") {
        this.inTextBlock = false;
        return this.getOperator() || (() => {throw this.createError();})();
      }

      if (this.currentChar == "}") {
        this.inTextSection = true;
        this.advance();
      }

      if (this.inTextSection) {
        let text = "";
        while (
          this.currentChar != undefined
          && "{" != this.currentChar
          && this.currentChar != "`"
        ) {
          if (this.currentChar == "\\") {
            text += this.getEscapedChar();
          }
          else {
            text += this.currentChar;
          }
          this.advance();
        }

        if (this.currentChar == "{") {
          this.inTextSection = false;
          this.advance();
        }

        return new Token(TT.TextBlock, text);
      }
    }

    // Skip spaces:
    if ([" ", "\n", "\r", "\t"].includes(this.currentChar)) {
      // New lines: \n, \r\n, \r
      if (
        this.currentChar === "\n"
        || (this.currentChar === "\r" && this.peek() !== "\n")
      ) {
        this.line++;
        this.lineStartPos = this.pos;
      }

      if (skipSpaces) {
        this.skipSpaces();
        return this.getNextToken(skipSpaces);
      }

      token = new Token(TT.Space, " ");
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
        return new Token(TT.StrConst, str);
      }
    }

    // If point or digit, gets a number, integer or float:
    // Ignores two points in a row (..) because that is a range operator.
    if ((this.currentChar == "." && this.peek() != ".") || Types.isInteger(this.currentChar)) {
      let number = this.getNumber();
      if (number) {
        if (Types.isInteger(number)) {
          return new Token(TT.IntConst, parseInt(number));
        }
        return new Token(TT.DecConst, parseFloat(number));
      }
    }

    // Variable names:
    if (Validation.isValidStartVariableName(this.currentChar)) {
      return this.id();
    }

    // Operators:
    let operator = this.getOperator();
    if (operator) {
      return operator;
    }

    throw this.createError();
  }
}

"use strict";

const {TokenTypes} = require("./Token");
const {ASTNumber} = require("./ASTNumber");
const {ASTUnaryOperator} = require("./ASTUnaryOperator");
const {ASTBinaryOperator} = require("./ASTBinaryOperator");





/**
 * Related definitions:
 * - Compiler: Translator that translates the source to machine code in order to it can be executed
 *   by a machine.
 * - Parser: Process directly the source code without any translation to machine code.
 * - Parsing/Syntax analysis: The process of recognizing a phrase in the stream of tokens.
 * - Parser/Syntax analyzer: The part of the interpreter that does the parsing.
 *
 * - Context-free grammars, grammars, BNF (Backus-Naur Form): Specifies the syntax of a programming
 *   language in a concise manner.
 * 
 * - Precedence of operators: If the operator * takes its operands before + does, then it has higher
 *   precedence.
 * - Associativity of operators: When an operand like 3 in the expression 7 + 3 + 1 has plus signs
 *   on both sides, we need a convention to decide which operator applies to 3. The operator +
 *   associates to the left because an operand that has plus signs on both sides belongs to the
 *   operator to its left and so we say that the operator + is left-associative.
 * 
 * Guidelines to code a grammar:
 * - Each rule, R, defined in the grammar, becomes a method with the same name, and references to
 *   that rule become a method call: R(). The body of the method follows the flow of the body of the
 *   rule using the very same guidelines.
 * - Alternatives (a1 | a2 | aN) become an if-elif-else statement
 * - An optional grouping (…)* becomes a while statement that can loop over zero or more times
 * - Each token reference T becomes a call to the method eat: eat(T). The way the eat method works
 *   is that it consumes the token T if it matches the current lookahead token, then it gets a new
 *   token from the lexer and assigns that token to the current_token internal variable.
 * - For each level of precedence define a non-terminal. The body of a production for the
 *   non-terminal should contain arithmetic operators from that level and non-terminals for the next
 *   higher level of precedence.
 * - Create an additional non-terminal factor for basic units of expression, in our case, integers.
 *   The general rule is that if you have N levels of precedence, you will need N + 1 non-terminals
 *   in total: one non-terminal for each level plus one non-terminal for basic units of expression.
 * 
 * Precedence table (from higher to lower):
 * | Precedence level  Associativity  Operators
 * | 14                Left           ||
 * | 13                Left           &&
 * | 9                 Left           ==, !=
 * | 8                 Left           <, >, <=, >=
 * | 6                 Left           +, -           Plus and minus
 * | 5                 Left           *, /, %
 * | 4                 Left           +, -           Unary plus and minus
 * v 
 * 
 * expr   -> term ((OpPlus | OpMinus) term)*
 * term   -> factor ((OpMultiplication | OpDivision | OpModulus) factor)*
 * factor -> (TypeInteger | TypeDecimal) | OpParenthesisOpen expr OpParenthesisClose
 * 
 * expr   -> term ((OpPlus | OpMinus) term)*
 * term   -> factor ((OpMultiplication | OpDivision | OpModulus) factor)*
 * factor -> (OpPlus | OpMinus) factor | (TypeInteger | TypeDecimal) | (OpParenthesisOpen expr OpParenthesisClose)
 */
class Parser {
  constructor(lexer) {
    this.showDebug = false;
    this.lexer = lexer;
    
    this.eat();
  }



  error(message, me) {
    if (message) {
      console.log(message, me);
    }
    throw new Error('Ivalid syntax.');
  }
  
  debug(message = "") {
    if (this.showDebug) {
      this.lexer.debug(message);
      console.log("-- Parser: "+ message);
      if (this.currentToken) {
        console.log("  current token - "+ this.currentToken.type +" - "+ this.currentToken.value);
      }
    }
  }



  eat(tokenTypes = null, skipSpaces = true) {
    // Just eats a token without any validation.
    if (!tokenTypes) {
      this.currentToken = this.lexer.getNextToken(skipSpaces);
      return;
    }

    if (!Array.isArray(tokenTypes)) {
      tokenTypes = [tokenTypes];
    }

    /*
    Compare the current token type with the passed token types and if they match then "eat" the
    current token and assign the next token to the this.currentToken, otherwise raise an exception.
    */
    if (tokenTypes.includes(this.currentToken.type)) {
      this.currentToken = this.lexer.getNextToken(skipSpaces);
    }
    else {
      this.error(this.currentToken.type +" not in ", tokenTypes);
    }
  }

  parenthesisOperator() {
    this.debug("Get parenthesis operator");
    let token = this.currentToken;
    this.eat([
      TokenTypes.OpParenthesisOpen,
      TokenTypes.OpParenthesisClose
    ]);
    return token;
  }

  sumOperators() {
    this.debug("Get sum operator");
    let operatorToken = this.currentToken;
    this.eat([
      TokenTypes.OpPlus,
      TokenTypes.OpMinus,
    ]);
    return operatorToken;
  }

  arithmeticOperator() {
    this.debug("Get arithmetic operator");
    let operatorToken = this.currentToken;
    this.eat([
      TokenTypes.OpPlus,
      TokenTypes.OpMinus,
      TokenTypes.OpMultiplication,
      TokenTypes.OpDivision
    ]);
    return operatorToken;
  }

  factorOperator() {
    this.debug("Get factor operator");
    let operatorToken = this.currentToken;
    this.eat([
      TokenTypes.OpMultiplication,
      TokenTypes.OpDivision,
      TokenTypes.OpModulus,
    ]);
    return operatorToken;
  }



  /**
   * factor -> (OpPlus | OpMinus) factor | (TypeInteger | TypeDecimal) | (OpParenthesisOpen expr OpParenthesisClose)
   */
  factor() {
    this.debug("Get factor");
    
    let node;
    // Unary operator + or -:
    if ([TokenTypes.OpMinus, TokenTypes.OpPlus].includes(this.currentToken.type)) {
      let operator = this.sumOperators();
      node = new ASTUnaryOperator(operator, this.factor());
    }
    // If current token is a parenthesis aperture "(":
    else if (this.currentToken.type == TokenTypes.OpParenthesisOpen) {
      // We eat the parenthesis opening (we can just ignore it).
      this.parenthesisOperator(); // Open.
      /* We support a full expression inside the parenthesis. This includes from a single numbber to
      complex expression like other ones with parenthesis. */
      node = this.expr();
      // We eat the parenthesis closure (we can just ignore it).
      this.parenthesisOperator(); // Close.
    }
    // Number:
    else if ([TokenTypes.TypeInteger, TokenTypes.TypeDecimal].includes(this.currentToken.type)) {
      node = new ASTNumber(this.currentToken);
      this.eat([TokenTypes.TypeInteger, TokenTypes.TypeDecimal]);
    }
    
    return node;
  }

  /**
   * term -> factor ((OpMultiplication | OpDivision | OpModulus) factor)*
   */
  term() {
    this.debug("Get term");

    /* We expect the current token to be a number (1, 14, 1.4...) or a parenthesis opening
    containing an expression. */
    let node = this.factor();
    
    let allowedOperators = [
      TokenTypes.OpMultiplication,
      TokenTypes.OpDivision,
      TokenTypes.OpModulus,
    ];

    while (allowedOperators.includes(this.currentToken.type)) {
      // We expect the current token to be an arithmetic operator token (+, -, * or /).
      let op = this.factorOperator();
      
      /* We expect the current token to be a number (1, 14, 1.4...) or a factor opening
      containing an expression. */
      let right = this.factor();
      
      node = new ASTBinaryOperator(node, op, right);
    }

    return node;
  }

  /**
   * expr -> term ((OpPlus | OpMinus) term)*
   */
  expr() {
    this.debug("expr");

    // We expect the current token to be a number (1, 14, 1.4...).
    let node = this.term();
    
    let allowedOperators = [
      TokenTypes.OpPlus,
      TokenTypes.OpMinus
    ];

    while (allowedOperators.includes(this.currentToken.type)) {
      // We expect the current token to be an arithmetic operator token (+ or -).
      let op = this.sumOperators();
      
      // We expect the current token to be a number (1, 14, 1.4...).
      let right = this.term();

      node = new ASTBinaryOperator(node, op, right);
    }

    return node;
  }



  parse() {
    return this.expr();
  }
}



module.exports = {Parser};

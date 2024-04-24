import {Operators} from "./Lexer/Operators";
import AST from "./ASTNodes/AST";
import ASTAssign from "./ASTNodes/ASTAssign";
import ASTBinaryOperator from "./ASTNodes/ASTBinaryOperator";
import ASTBoolean from "./ASTNodes/ASTBoolean";
import ASTCompound from "./ASTNodes/ASTCompound";
import ASTConstantDeclaration from "./ASTNodes/ASTConstantDeclaration";
import ASTFunctionCall from "./ASTNodes/ASTFunctionCall";
import ASTNumber from "./ASTNodes/ASTNumber";
import ASTString from "./ASTNodes/ASTString";
import ASTType from "./ASTNodes/ASTType";
import ASTUnaryOperator from "./ASTNodes/ASTUnaryOperator";
import ASTVariable from "./ASTNodes/ASTVariable";
import ASTVariableDeclaration from "./ASTNodes/ASTVariableDeclaration";
import Lexer from "./Lexer/Lexer";
import Token from "./Token";
import TokenTypes from "./TokenTypes";
import ASTIf from "./ASTNodes/ASTIf";
import ASTWhile from "./ASTNodes/ASTWhile";
import ASTTextBlock from "./ASTNodes/ASTTextBlock";
import ASTTextProcessor from "./ASTNodes/ASTTextProcessor";
import ASTArray from "./ASTNodes/ASTArray";
import ASTObject from "./ASTNodes/ASTObject";


class ParserError extends Error {
  constructor(
    public token: string,
    public line: number,
    public position: number,
    public nearCode: string,
  ) {
    super(
      "Ivalid syntax in \""+ token +"\""
      +" at position "+ position
      +" of line "+ line
      +". Near of: "+ nearCode,
    );
  }
}


const constantTypes = [
  TokenTypes.TypeBoolean,
  TokenTypes.TypeChar,
  TokenTypes.TypeInteger,
  TokenTypes.TypeFloat,
  TokenTypes.TypeDouble,
  TokenTypes.TypeString,
];

const variableTypes = [
  TokenTypes.TypeAny,
  ...constantTypes,
];

const assignOperators = [
  TokenTypes.OpAssign,
  TokenTypes.OpPlusAssign,
  TokenTypes.OpMinusAssign,
  TokenTypes.OpMultiplicationAssign,
  TokenTypes.OpDivisionAssign,
  TokenTypes.OpModulusAssign,
  TokenTypes.OpPowAssign,
];

const availableConstants = [
  TokenTypes.BooleanConstant,
  TokenTypes.IntegerConstant,
  TokenTypes.DecimalConstant,
  TokenTypes.StringConstant,
  TokenTypes.Backtip,
];


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
 * |  Precedence level  Associativity  Operators
 * |  14                Left           ||             Logical or
 * |  13                Left           &&             Logical and
 * |  9                 Left           ==, !=         Equality
 * |  8                 Left           <, >, <=, >=   Relational
 * |  7                 Left           +, -           Plus and minus
 * |  6                 Left           *, /, %        Factor
 * |  5                 Left           !, +, -        Unary plus and minus
 * |  4                 Left (change)  ^, ¬/          Power
 * |  3                 Left           ¬/             Sqrt
 * |  2                 Left           ()             Function
 * V  1                 Left           ., []          Accessors
 */
export default class Parser {
  showDebug = false;
  currentToken: Token;
  lexer: Lexer;


  constructor(lexer: Lexer) {
    this.lexer = lexer;
    // this.eat();
  }

  createError() {
    return new ParserError(
      String(this.currentToken.value),
      this.lexer.line + 1,
      this.lexer.getLinePosition() - (String(this.currentToken.value)).length + 1,
      this.lexer.text.slice(
        this.lexer.pos - 10 < 0 ? 0 : this.lexer.pos - 10,
        this.lexer.pos + 10 > this.lexer.text.length ? this.lexer.text.length : this.lexer.pos + 10,
      ),
    );
  }

  error(message: string, me: any) {
    if (message) {
      console.log(message, me);
    }
    throw this.createError();
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


  eat(tokenTypes?: string|string[], skipSpaces = true) {
    // this.debug("Parser: "+ this.getCurrentMethodName());
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
    tokenTypes = tokenTypes as string[];
    if (tokenTypes.includes(this.currentToken.type)) {
      this.currentToken = this.lexer.getNextToken(skipSpaces);
    }
    else {
      // this.error(this.currentToken.type +" not in ", tokenTypes);
      this.error("Unexpected token: ", this.currentToken.value);
    }
  }

  operator(allowed: string|string[]) {
    let token = this.currentToken;
    this.eat(allowed);
    return token;
  }


  typeSpec() {
    let node = new ASTType(this.currentToken);
    this.eat(variableTypes);
    return node;
  }

  array() {
    let root = new ASTArray();
    this.eat(TokenTypes.OpArrayAccessorOpen);
    while (![TokenTypes.OpArrayAccessorClose].includes(this.currentToken.type)) {
      root.children.push(this.expr());
      if (this.currentToken.type == TokenTypes.OpComma) {
        this.eat(TokenTypes.OpComma);
      }
    }
    this.eat(TokenTypes.OpArrayAccessorClose);
    return root;
  }

  object() {
    let root = new ASTObject();
    this.eat(TokenTypes.OpCurlyBraceOpen);
    while (![TokenTypes.OpCurlyBraceClose].includes(this.currentToken.type)) {
      let key = this.expr();
      this.eat(TokenTypes.OpColon);
      let value = this.expr();
      root.members.set(key, value);
      if (this.currentToken.type == TokenTypes.OpComma) {
        this.eat(TokenTypes.OpComma);
      }
    }
    this.eat(TokenTypes.OpCurlyBraceClose);
    return root;
  }

  constant() {
    // console.log("this.currentToken", this.currentToken);
    let node;
    if (this.currentToken.type == TokenTypes.BooleanConstant) {
      node = new ASTBoolean(this.currentToken);
      this.eat(TokenTypes.BooleanConstant);
    }
    // Number:
    else if ([TokenTypes.IntegerConstant, TokenTypes.DecimalConstant].includes(this.currentToken.type)) {
      // console.log("this.currentToken", this.currentToken)
      node = new ASTNumber(this.currentToken);
      this.eat([TokenTypes.IntegerConstant, TokenTypes.DecimalConstant]);
    }
    // String
    else if (this.currentToken.type == TokenTypes.StringConstant) {
      node = new ASTString(this.currentToken);
      this.eat(TokenTypes.StringConstant);
    }
    // Template
    else if (this.currentToken.type == TokenTypes.Backtip) {
      node = this.textProcessor();
    }
    else if (this.currentToken.type == TokenTypes.OpArrayAccessorOpen) {
      node = this.array();
    }
    else if (this.currentToken.type == TokenTypes.OpCurlyBraceOpen) {
      node = this.object();
    }
    else {
      throw this.createError();
    }
    return node;
  }

  /**
   * variable -> ID
   * @return {ASTVariable}
   */
  variable() {
    let node = new ASTVariable(this.currentToken);
    this.eat(TokenTypes.Id);
    return node;
  }

  /**
   * member      -> variable (
   *                  OpDot variable
   *                  | OpArrayAccessorOpen expr OpArrayAccessorClose
   *                )*
   * @return {AST}
   */
  member() {
    // Get variable (Id).
    let node: AST = this.variable();
    let accessorOperators = [
      TokenTypes.OpDot,
      TokenTypes.OpArrayAccessorOpen,
    ];

    while (accessorOperators.includes(this.currentToken.type)) {
      let arrayAccessor = false;
      if (this.currentToken.type == TokenTypes.OpArrayAccessorOpen) {
        arrayAccessor = true;
      }

      let operator = this.operator(accessorOperators);
      let right;
      if (arrayAccessor) {
        right = this.expr();
      }
      else if (this.currentToken.type == TokenTypes.OpCurlyBraceOpen) {
        operator = this.operator([TokenTypes.OpCurlyBraceOpen]);
        right = this.expr();
        this.eat(TokenTypes.OpCurlyBraceClose);
      }
      else {
        right = this.variable();
      }

      node = new ASTBinaryOperator(
        node,
        // We expect the current token will be a "." (member accesor).
        operator,
        right,
      );

      if (arrayAccessor) {
        this.eat(TokenTypes.OpArrayAccessorClose);
      }
    }

    return node;
  }

  /**
   * paramList   -> expr (OpComma expr)*
   * @return {AST[]}
   */
  paramList(): AST[] {
    let nodes: AST[] = [];

    let currExpr = this.expr();
    if (currExpr !== null) {
      nodes.push(currExpr);
      while (this.currentToken.type == TokenTypes.OpComma) {
        this.eat(TokenTypes.OpComma);
        nodes.push(this.expr());
      }
    }

    return nodes;
  }

  /**
   * funcCall    -> OpParenthesisOpen paramList? OpParenthesisClose
   * @return {AST[]}
   */
  funcCall(): AST[] {
    let nodes: AST[] = [];

    // We eat the parenthesis opening (we can just ignore it).
    this.operator([TokenTypes.OpParenthesisOpen]); // Open.
    if (this.currentToken.type != TokenTypes.OpParenthesisClose) {
      nodes = this.paramList();
    }

    // We eat the parenthesis closure (we can just ignore it).
    this.operator([TokenTypes.OpParenthesisClose]); // Close.
    return nodes;
  }

  /**
   * factor     -> (OpPlus | OpMinus | OpNot | OpSqrt) factor
   *               | (OpParenthesisOpen expr OpParenthesisClose)
   *               | constant
   *               | (OpIncrement | OpDecrement)? member funcCall?
   * @return {AST}
   */
  factor(): AST {
    let node;
    // Unary operator + or -:
    let allowedOperators = [
      TokenTypes.OpMinus,
      TokenTypes.OpPlus,
      TokenTypes.OpNot,
      TokenTypes.OpSqrt,
    ];

    if (allowedOperators.includes(this.currentToken.type)) {
      node = new ASTUnaryOperator(this.operator(allowedOperators), this.factor());
    }
    // If current token is a parenthesis aperture "(":
    else if (this.currentToken.type == TokenTypes.OpParenthesisOpen) {
      // We eat the parenthesis opening (we can just ignore it).
      this.operator([TokenTypes.OpParenthesisOpen]); // Open.
      /* We support a full expression inside the parenthesis. This includes from a single numbber to
      complex expression like other ones with parenthesis. */
      node = this.expr();
      // We eat the parenthesis closure (we can just ignore it).
      this.operator([TokenTypes.OpParenthesisClose]); // Close.
    }
    else if (
      [
        ...availableConstants,
        TokenTypes.OpArrayAccessorOpen,
        TokenTypes.OpCurlyBraceOpen,
      ].includes(this.currentToken.type)
    ) {
      node = this.constant();
    }
    else if ([TokenTypes.OpIncrement, TokenTypes.OpDecrement].includes(this.currentToken.type)) {
      let preOp = this.operator([TokenTypes.OpIncrement, TokenTypes.OpDecrement]);
      node = this.member();
      node = new ASTUnaryOperator(
        preOp,
        node,
      );
    }
    else /* if (this.currentToken.type == TokenTypes.Id) */ {
      node = this.member();
      if ([TokenTypes.OpParenthesisOpen].includes(this.currentToken.type)) {
        node = new ASTFunctionCall(
          node,
          this.funcCall(),
        );
      }
    }

    return node;
  }

  /**
   * pow -> factor (OpPow pow)*
   * @return {AST}
   */
  pow() {
    return this.binaryOperand(this.factor, [TokenTypes.OpPow], this.pow);
  }

  /**
   * term -> pow (
   *           (Id | BooleanConstant | CharConstant | IntegerConstant | DecimalConstant)
   *           | (OpMultiplication | OpDivision | OpModulus) pow
   *         )*
   * algo algo -> algo * algo
   * @return {AST}
   */
  term() {
    /* We expect the current token to be a number (1, 14, 1.4...) or a parenthesis opening
    containing an expression. */
    let node = this.pow();
    let allowedMembers = [ // For short multiplication: 2a, 2(a), a a, a(a), 2 2
      TokenTypes.Id,
      TokenTypes.BooleanConstant,
      TokenTypes.CharConstant,
      TokenTypes.IntegerConstant,
      TokenTypes.DecimalConstant,
      TokenTypes.Backtip,
      // TokenTypes.OpParenthesisOpen, // Collision with function calls.
    ];
    let allowedOperators = [
      TokenTypes.OpMultiplication,
      TokenTypes.OpDivision,
      TokenTypes.OpModulus,
    ];
    let anyAllowed = [
      ...allowedMembers,
      ...allowedOperators,
    ];

    while (anyAllowed.includes(this.currentToken.type)) {
      let operator: Token;
      if (allowedMembers.includes(this.currentToken.type)) {
        operator = Operators.get("*");
      }
      else {
        operator = this.operator(allowedOperators);
      }
      node = new ASTBinaryOperator(
        node,
        operator,
        this.pow(),
      );
    }

    return node;
  }

  /**
   * relational -> term ((OpPlus | OpMinus) term)*
   * @return {AST}
   */
  relational() {
    return this.binaryOperand(this.term, [
      TokenTypes.OpPlus,
      TokenTypes.OpMinus,
    ]);
  }

  /**
   * equality -> relational (
   *               (OpGreaterThan | OpLowerThan | OpGreaterThanEqual | OpLowerThanEqual) relational
   *             )*
   * @return {AST}
   */
  equality() {
    return this.binaryOperand(this.relational, [
      TokenTypes.OpGreaterThan,
      TokenTypes.OpGreaterThanEqual,
      TokenTypes.OpLowerThan,
      TokenTypes.OpLowerThanEqual,
    ]);
  }

  /**
   * and -> equality ((OpEqual | OpNotEqual) equality)*
   * @return {AST}
   */
  andOperand() {
    return this.binaryOperand(this.equality, [
      TokenTypes.OpEqual,
      TokenTypes.OpNotEqual,
      TokenTypes.OpLaxEqual,
      TokenTypes.OpLaxNotEqual,
    ]);
  }

  /**
   * orOperand  -> andOperand (OpAnd andOperand)*
   * @return {AST}
   */
  orOperand() {
    return this.binaryOperand(this.andOperand, [TokenTypes.OpAnd]);
  }

  /**
   * assignOperand  -> orOperand (OpOr orOperand)*
   * @return {AST}
   */
  assignOperand(): AST {
    return this.binaryOperand(this.orOperand, [TokenTypes.OpOr]);
  }

  binaryOperand(
    cbStart: () => AST, tokenTypeNext: string[], cbNext?: () => AST, operator?: string[],
  ) {
    cbNext = cbNext || cbStart;
    operator = operator || tokenTypeNext;
    let node = cbStart.call(this);
    while (tokenTypeNext.includes(this.currentToken.type)) {
      node = new ASTBinaryOperator(
        node,
        this.operator(operator),
        cbNext.call(this),
      );
    }
    return node;
  }

  /**
   * expr ->    assignOperand (assignOperator expr)*
   * @return {AST}
   */
  expr() {
    let startingWithId = this.currentToken.type == TokenTypes.Id;
    let node: AST = this.assignOperand();
    if (startingWithId) {
      if (assignOperators.includes(this.currentToken.type)) {
        node = new ASTAssign(
          node,
          this.operator(assignOperators),
          this.expr(),
        );
      }
      else if (this.currentToken.type == TokenTypes.Id) {
        this.error("Invalid syntax", this.currentToken.value);
      }
    }
    return node;
  }

  /**
   * First assign must use the simple assign operator.
   * declAssign  -> member [OpAssign assign]
   * declAssign  -> member | member OpAssign assign
   * @param {boolean} initializationRequired
   * @return {AST}
   */
  declAssign(initializationRequired = false) {
    let node = this.member();
    if (this.currentToken.type == TokenTypes.OpAssign || initializationRequired) {
      node = new ASTAssign(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator(TokenTypes.OpAssign),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.expr(),
      );
    }
    return node;
  }

  /**
   * commaDecl -> declAssign (OpComma declAssign)*
   * @param {boolean} initializationRequired
   * @return {AST[]}
   */
  commaDecl(initializationRequired = false) {
    let declarationNodes = [
      this.declAssign(initializationRequired),
    ];
    while (this.currentToken.type == TokenTypes.OpComma) {
      this.eat(TokenTypes.OpComma);
      declarationNodes.push(this.declAssign(initializationRequired));
    }
    return declarationNodes;
  }

  /**
   * varDecl     -> (ModVar typeSpec? | ModVar? typeSpec) commaDecl
   * varDecl     -> (ModVar | ModVar typeSpec | typeSpec) commaDecl
   * @return {AST}
   */
  varDecl() {
    let root = new ASTVariableDeclaration();

    // If ModVar is present, typeSpec is optional.
    if (this.currentToken.type == TokenTypes.ModVar) {
      this.eat(TokenTypes.ModVar);
      if (variableTypes.includes(this.currentToken.type)) { // Optional
        root.typeNode = this.typeSpec();
      }
    }
    else { // If ModVar is not present, typeSpec is required.
      root.typeNode = this.typeSpec();
    }

    root.children = this.commaDecl();

    return root;
  }

  /**
   * constDecl   -> ModConst [typeSpec] commaDecl
   * @return {AST}
   */
  constDecl() {
    let root = new ASTConstantDeclaration();
    this.eat(TokenTypes.ModConst); // Required.

    if (constantTypes.includes(this.currentToken.type)) { // Optional.
      root.typeNode = this.typeSpec();
    }

    root.children = this.commaDecl(true);
    return root;
  }

  /**
   * declaration -> constDecl | varDecl
   * @return {AST}
   */
  declaration() {
    let node = null;
    if (this.currentToken.type == TokenTypes.ModConst) {
      node = this.constDecl();
    }
    else if ([TokenTypes.ModVar, ...variableTypes].includes(this.currentToken.type)) {
      node = this.varDecl();
    }
    // else /* if (this.currentToken.type != TokenTypes.OpSemicolon) */ {
    //   node = this.expr();
    // }
    return node;
  }

  /**
   * block    -> OpCurlyBraceOpen statementList OpCurlyBraceClose
   * @return {ASTCompound}
   */
  block() {
    this.eat([TokenTypes.OpCurlyBraceOpen]);
    let root = this.statementList([TokenTypes.OpCurlyBraceClose]);
    this.eat([TokenTypes.OpCurlyBraceClose]);
    return root;
  }

  /**
   * colonBlock -> OpColon statementList endCheck
   * @param {string[]} endCheck
   * @param {string[]} endEat
   * @return {ASTCompound}
   */
  colonBlock(endCheck: string[], endEat?: string[]) {
    endEat = endEat || endCheck;
    this.eat([TokenTypes.OpColon]);
    let root = this.statementList(endCheck);
    if (endEat.includes(this.currentToken.type)) {
      this.eat(endEat);
    }
    return root;
  }

  /**
   * elseStatement  -> Else (ifStatement | controlBody)
   * @return {AST}
   */
  elseStatement() {
    let node: AST;
    this.eat([TokenTypes.Else]);
    if (this.currentToken.type === TokenTypes.If) {
      node = this.ifStatement();
    }
    else {
      node = this.controlBody(() => this.colonBlock([TokenTypes.EndIf]));
    }
    return node;
  }

  /**
   * controlCondition -> (OpParenthesisOpen expr OpParenthesisClose) | expr
   * @return {AST}
   */
  controlCondition() {
    let condition: AST;
    if (this.currentToken.type === TokenTypes.OpParenthesisOpen) {
      this.eat([TokenTypes.OpParenthesisOpen]);
      condition = this.expr();
      this.eat([TokenTypes.OpParenthesisClose]);
    }
    else {
      condition = this.expr();
    }
    return condition;
  }

  /**
   * controlbody -> block | colonBlock | statement
   * @param {Function} colonBodyCb
   * @return {AST}
   */
  controlBody(colonBodyCb: () => AST) {
    let body: AST;
    if (this.currentToken.type === TokenTypes.OpCurlyBraceOpen) {
      body = this.block();
    }
    else if (this.currentToken.type == TokenTypes.OpColon) {
      body = colonBodyCb();
    }
    else {
      if (this.currentToken.type == TokenTypes.OpArrow) {
        this.eat([TokenTypes.OpArrow]);
      }
      body = this.statement();
    }
    return body;
  }

  /**
   * ifStatement    -> If controlCondition controlBody [elseStatement]
   * @return {ASTIf}
   */
  ifStatement() {
    let condition: AST, nodeTrue: AST, nodeFalse: AST;
    let token = this.currentToken;

    this.eat([TokenTypes.If]);
    condition = this.controlCondition();
    nodeTrue = this.controlBody(() => this.colonBlock(
      [TokenTypes.EndIf, TokenTypes.Else],
      [TokenTypes.EndIf],
    ));

    // Else:
    if (this.currentToken.type == TokenTypes.Else) {
      nodeFalse = this.elseStatement();
    }

    return new ASTIf(token, condition, nodeTrue, nodeFalse);
  }

  /**
   * whileStatement    -> While controlCondition controlBody
   * @return {ASTIf}
   */
  whileStatement() {
    let token = this.currentToken;
    this.eat([TokenTypes.While]);
    return new ASTWhile(
      token,
      this.controlCondition(),
      this.controlBody(() => this.colonBlock([TokenTypes.EndWhile])),
    );
  }

  textBlock() {
    let node = new ASTTextBlock(this.currentToken);
    this.eat(TokenTypes.TextBlock);
    return node;
  }

  /**
   * tetxProcessor -> Backtip block Backtip
   * @return {ASTTextProcessor}
   */
  textProcessor() {
    let node: ASTTextProcessor = new ASTTextProcessor(this.currentToken);
    this.eat(TokenTypes.Backtip);
    while (![TokenTypes.Backtip, TokenTypes.EoF].includes(this.currentToken.type)) {
      node.children.push(this.statement());
    }
    if (this.currentToken.type == TokenTypes.Backtip) {
      this.eat(TokenTypes.Backtip);
    }
    return node;
  }

  /**
   * statement  -> ifStatement | whileStatement | declaration | expr | textProcessor | empty
   * @return {AST}
   */
  statement() {
    let node: AST = null;
    if (this.currentToken.type == TokenTypes.If) {
      node = this.ifStatement();
    }
    else if (this.currentToken.type == TokenTypes.While) {
      node = this.whileStatement();
    }
    else if (
      [
        TokenTypes.ModConst, TokenTypes.ModVar,
        ...variableTypes,
      ].includes(this.currentToken.type)
    ) {
      node = this.declaration();
    }
    else if (this.currentToken.type == TokenTypes.OpSemicolon) {
      // TODO: Implement empty AST?
    }
    else if (this.currentToken.type == TokenTypes.Backtip) {
      node = this.textProcessor();
    }
    else if (this.currentToken.type == TokenTypes.TextBlock) {
      node = this.textBlock();
    }
    else {
      // console.log("expr");
      node = this.expr();
    }

    if (this.currentToken.type == TokenTypes.OpSemicolon) {
      this.eat(TokenTypes.OpSemicolon);
    }

    // You could prefer returns an ASTEmpty or something like that here if node is empty.
    return node;
  }

  /**
   * statementList -> statement*
   * @param {string[]} end
   * @return {ASTCompound}
   */
  statementList(end: string[]) {
    let root = new ASTCompound();
    while (!end.includes(this.currentToken.type)) {
      let node = this.statement();
      if (node) { // For empty lines.
        root.children.push(node);
      }
    }
    return root;
  }

  /**
   * script     -> statementList EoF
   * @return {AST}
   */
  script() {
    return this.statementList([TokenTypes.EoF]);
  }

  /*
  getCurrentMethodName() {
    const err = new Error();
    const stack = err.stack!.split("\n")[2];
    let info = stack.match(/at ((\w+)\.)*(\w*) /);
    return info![info.index - 1];
  }
  */

  parse() {
    this.eat();
    return this.script();
  }
}

import {OP} from "./Lexer/Operators";
import {Node} from "./ASTNodes/ASTNode";
import {Assign} from "./ASTNodes/Assign";
import {BinOperator} from "./ASTNodes/BinOperator";
import {Bool} from "./ASTNodes/Bool";
import {Compound} from "./ASTNodes/Compound";
import {ConstDecl} from "./ASTNodes/ConstDecl";
import {FnDecl} from "./ASTNodes/FnDecl";
import {FnCall} from "./ASTNodes/FnCall";
import {Num} from "./ASTNodes/Num";
import {Str} from "./ASTNodes/Str";
import {Type} from "./ASTNodes/Type";
import {UnaryOperator} from "./ASTNodes/UnaryOperator";
import {Variable} from "./ASTNodes/Variable";
import {VarDecl} from "./ASTNodes/VarDecl";
import {Lexer} from "./Lexer/Lexer";
import {Token} from "./Token";
import {TT} from "./TokenTypes";
import {If} from "./ASTNodes/If";
import {While} from "./ASTNodes/While";
import {TxtBlock} from "./ASTNodes/TxtBlock";
import {TxtProcessor} from "./ASTNodes/TxtProcessor";
import {Arr} from "./ASTNodes/Arr";
import {Obj} from "./ASTNodes/Obj";


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
  TT.TBool,
  TT.TChar,
  TT.TInt,
  TT.TFloat,
  TT.TDouble,
  TT.TStr,
];

const variableTypes = [
  TT.TAny,
  ...constantTypes,
];

const assignOperators = [
  TT.OpAssign,
  TT.OpPlusAssign,
  TT.OpMinusAssign,
  TT.OpTimesAssign,
  TT.OpDivAssign,
  TT.OpModAssign,
  TT.OpPowAssign,
];

const availableConstants = [
  TT.BoolConst,
  TT.IntConst,
  TT.DecConst,
  TT.StrConst,
  TT.Backtip,
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
 * |  16                Left           in             In
 * |  15                Left           .., ..<        Range
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
export class Parser {
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
    let node = new Type(this.currentToken);
    this.eat(variableTypes);
    return node;
  }

  array() {
    let root = new Arr();
    this.eat(TT.BracketOpen);
    while (![TT.BracketClose].includes(this.currentToken.type)) {
      root.children.push(this.expr());
      if (this.currentToken.type == TT.Comma) {
        this.eat(TT.Comma);
      }
    }
    this.eat(TT.BracketClose);
    return root;
  }

  object() {
    let root = new Obj();
    this.eat(TT.CurlyOpen);
    while (![TT.CurlyClose].includes(this.currentToken.type)) {
      let key = this.expr();
      this.eat(TT.Colon);
      let value = this.expr();
      root.members.set(key, value);
      if (this.currentToken.type == TT.Comma) {
        this.eat(TT.Comma);
      }
    }
    this.eat(TT.CurlyClose);
    return root;
  }

  constant() {
    // console.log("this.currentToken", this.currentToken);
    let node;
    if (this.currentToken.type == TT.BoolConst) {
      node = new Bool(this.currentToken);
      this.eat(TT.BoolConst);
    }
    // Number:
    else if ([TT.IntConst, TT.DecConst].includes(this.currentToken.type)) {
      // console.log("this.currentToken", this.currentToken)
      node = new Num(this.currentToken);
      this.eat([TT.IntConst, TT.DecConst]);
    }
    // String
    else if (this.currentToken.type == TT.StrConst) {
      node = new Str(this.currentToken);
      this.eat(TT.StrConst);
    }
    // Template
    else if (this.currentToken.type == TT.Backtip) {
      node = this.textProcessor();
    }
    else if (this.currentToken.type == TT.BracketOpen) {
      node = this.array();
    }
    else if (this.currentToken.type == TT.CurlyOpen) {
      node = this.object();
    }
    else {
      throw this.createError();
    }
    return node;
  }

  /**
   * variable -> ID
   * @return {Variable}
   */
  variable() {
    let node = new Variable(this.currentToken);
    this.eat(TT.Id);
    return node;
  }

  /**
   * member      -> variable (
   *                  (Dot variable)
   *                  | (Dot CurlyOpen expr CurlyClose)
   *                  | (BracketOpen expr BracketClose)
   *                )*
   * @return {Node}
   */
  member() {
    // Get variable (Id).
    let node: Node = this.variable();
    let accessorOperators = [
      TT.Dot,
      TT.BracketOpen,
    ];

    while (accessorOperators.includes(this.currentToken.type)) {
      let arrayAccessor = false;
      if (this.currentToken.type == TT.BracketOpen) {
        arrayAccessor = true;
      }

      let operator = this.operator(accessorOperators);
      let right;
      if (arrayAccessor) {
        right = this.expr();
      }
      else if (this.currentToken.type == TT.CurlyOpen) {
        operator = this.operator([TT.CurlyOpen]);
        right = this.expr();
        this.eat(TT.CurlyClose);
      }
      else {
        right = this.variable();
      }

      node = new BinOperator(
        node,
        // We expect the current token will be a "." (member accesor).
        operator,
        right,
      );

      if (arrayAccessor) {
        this.eat(TT.BracketClose);
      }
    }

    return node;
  }

  /**
   * paramList   -> expr (OpComma expr)*
   * @return {Node[]}
   */
  paramList(): Node[] {
    let nodes: Node[] = [];

    let currExpr = this.expr();
    if (currExpr !== null) {
      nodes.push(currExpr);
      while (this.currentToken.type == TT.Comma) {
        this.eat(TT.Comma);
        nodes.push(this.expr());
      }
    }

    return nodes;
  }

  /**
   * funcCall    -> OpParenthesisOpen paramList? OpParenthesisClose
   * @return {Node[]}
   */
  funcCall(): Node[] {
    let nodes: Node[] = [];

    // We eat the parenthesis opening (we can just ignore it).
    this.operator([TT.ParenOpen]); // Open.
    if (this.currentToken.type != TT.ParenClose) {
      nodes = this.paramList();
    }

    // We eat the parenthesis closure (we can just ignore it).
    this.operator([TT.ParenClose]); // Close.
    return nodes;
  }

  /**
   * factor     -> (OpPlus | OpMinus | OpNot | OpSqrt) factor
   *               | (ParenOpen expr ParenClose)
   *               | constant
   *               | (OpIncrement | OpDecrement)? member funcCall?
   * @return {Node}
   */
  factor(): Node {
    let node;
    // Unary operator + or -:
    let allowedOperators = [
      TT.OpMinus,
      TT.OpPlus,
      TT.OpNot,
      TT.OpSqrt,
    ];

    if (allowedOperators.includes(this.currentToken.type)) {
      node = new UnaryOperator(this.operator(allowedOperators), this.factor());
    }
    // If current token is a parenthesis aperture "(":
    else if (this.currentToken.type == TT.ParenOpen) {
      // We eat the parenthesis opening (we can just ignore it).
      this.operator([TT.ParenOpen]); // Open.
      /* We support a full expression inside the parenthesis. This includes from a single numbber to
      complex expression like other ones with parenthesis. */
      node = this.expr();
      // We eat the parenthesis closure (we can just ignore it).
      this.operator([TT.ParenClose]); // Close.
    }
    else if (
      [
        ...availableConstants,
        TT.BracketOpen,
        TT.CurlyOpen,
      ].includes(this.currentToken.type)
    ) {
      node = this.constant();
    }
    else if ([TT.OpIncr, TT.OpDecr].includes(this.currentToken.type)) {
      let preOp = this.operator([TT.OpIncr, TT.OpDecr]);
      node = this.member();
      node = new UnaryOperator(
        preOp,
        node,
      );
    }
    else /* if (this.currentToken.type == TokenTypes.Id) */ {
      node = this.member();
      if ([TT.ParenOpen].includes(this.currentToken.type)) {
        node = new FnCall(
          node,
          this.funcCall(),
        );
      }
    }

    return node;
  }

  /**
   * pow -> factor (OpPow pow)*
   * @return {Node}
   */
  pow() {
    return this.binaryOperand(this.factor, [TT.OpPow], this.pow);
  }

  /**
   * term -> pow (
   *           (Id | BoolConst | CharConst | IntConst | DecConst)
   *           | (OpTimes | OpDiv | OpMod) pow
   *         )*
   * algo algo -> algo * algo
   * @return {Node}
   */
  term() {
    /* We expect the current token to be a number (1, 14, 1.4...) or a parenthesis opening
    containing an expression. */
    let node = this.pow();
    let allowedMembers = [ // For short multiplication: 2a, 2(a), a a, a(a), 2 2
      TT.Id,
      TT.BoolConst,
      TT.CharConst,
      TT.IntConst,
      TT.DecConst,
      TT.Backtip,
      // TokenTypes.ParenOpen, // Collision with function calls.
    ];
    let allowedOperators = [
      TT.OpTimes,
      TT.OpDiv,
      TT.OpMod,
    ];
    let anyAllowed = [
      ...allowedMembers,
      ...allowedOperators,
    ];

    while (anyAllowed.includes(this.currentToken.type)) {
      let operator: Token;
      if (allowedMembers.includes(this.currentToken.type)) {
        operator = OP.get("*");
      }
      else {
        operator = this.operator(allowedOperators);
      }
      node = new BinOperator(
        node,
        operator,
        this.pow(),
      );
    }

    return node;
  }

  /**
   * relational -> term ((OpPlus | OpMinus) term)*
   * @return {Node}
   */
  relational() {
    return this.binaryOperand(this.term, [
      TT.OpPlus,
      TT.OpMinus,
    ]);
  }

  /**
   * equality -> relational (
   *               (OpGT | OpGTE | OpLT | OpLTE) relational
   *             )*
   * @return {Node}
   */
  equality() {
    return this.binaryOperand(this.relational, [
      TT.OpGT,
      TT.OpGTE,
      TT.OpLT,
      TT.OpLTE,
    ]);
  }

  /**
   * and -> equality ((OpEqual | OpNotEqual) equality)*
   * @return {Node}
   */
  andOperand() {
    return this.binaryOperand(this.equality, [
      TT.OpEq,
      TT.OpNEq,
      TT.OpLaxEq,
      TT.OpLaxNEq,
    ]);
  }

  /**
   * orOperand  -> andOperand (OpAnd andOperand)*
   * @return {Node}
   */
  orOperand() {
    return this.binaryOperand(this.andOperand, [TT.OpAnd]);
  }

  /**
   * rangeOperand  -> orOperand (OpOr orOperand)*
   * @return {Node}
   */
  rangeOperand() {
    return this.binaryOperand(this.orOperand, [TT.OpOr]);
  }

  /**
   * inOperand  -> rangeOperand (OpOr rangeOperand)*
   * @return {Node}
   */
  inOperand() {
    return this.binaryOperand(this.rangeOperand, [
      TT.OpExclRange,
      TT.OpInclRange,
    ]);
  }

  /**
   * assignOperand  -> inOperand (OpOr inOperand)*
   * @return {Node}
   */
  assignOperand(): Node {
    return this.binaryOperand(this.inOperand, [TT.OpIn]);
  }

  binaryOperand(
    cbStart: () => Node, tokenTypeNext: string[], cbNext?: () => Node, operator?: string[],
  ) {
    cbNext = cbNext || cbStart;
    operator = operator || tokenTypeNext;
    let node = cbStart.call(this);
    while (tokenTypeNext.includes(this.currentToken.type)) {
      node = new BinOperator(
        node,
        this.operator(operator),
        cbNext.call(this),
      );
    }
    return node;
  }

  /**
   * expr ->    assignOperand (assignOperator expr)*
   * @return {Node}
   */
  expr() {
    let startingWithId = this.currentToken.type == TT.Id;
    let node: Node = this.assignOperand();
    if (startingWithId) {
      if (assignOperators.includes(this.currentToken.type)) {
        node = new Assign(
          node,
          this.operator(assignOperators),
          this.expr(),
        );
      }
      else if (this.currentToken.type == TT.Id) {
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
   * @return {Node}
   */
  declAssign(initializationRequired = false) {
    let node = this.member();
    if (this.currentToken.type == TT.OpAssign || initializationRequired) {
      node = new Assign(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator(TT.OpAssign),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.expr(),
      );
    }
    return node;
  }

  /**
   * commaDecl -> declAssign (Comma declAssign)*
   * @param {boolean} initializationRequired
   * @return {Node[]}
   */
  commaDecl(initializationRequired = false) {
    let declarationNodes = [
      this.declAssign(initializationRequired),
    ];
    while (this.currentToken.type == TT.Comma) {
      this.eat(TT.Comma);
      declarationNodes.push(this.declAssign(initializationRequired));
    }
    return declarationNodes;
  }

  /**
   * varDecl     -> (ModVar typeSpec? | ModVar? typeSpec) commaDecl
   * varDecl     -> (ModVar | ModVar typeSpec | typeSpec) commaDecl
   * @return {Node}
   */
  varDecl() {
    let root = new VarDecl();

    // If ModVar is present, typeSpec is optional.
    if (this.currentToken.type == TT.ModVar) {
      this.eat(TT.ModVar);
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
   * @return {Node}
   */
  constDecl() {
    let root = new ConstDecl();
    this.eat(TT.ModConst); // Required.

    if (constantTypes.includes(this.currentToken.type)) { // Optional.
      root.typeNode = this.typeSpec();
    }

    root.children = this.commaDecl(true);
    return root;
  }

  /**
   * declaration -> constDecl | varDecl
   * @return {Node}
   */
  declaration() {
    let node = null;
    if (this.currentToken.type == TT.ModConst) {
      node = this.constDecl();
    }
    else if ([TT.ModVar, ...variableTypes].includes(this.currentToken.type)) {
      node = this.varDecl();
    }
    // else /* if (this.currentToken.type != TokenTypes.OpSemicolon) */ {
    //   node = this.expr();
    // }
    return node;
  }

  /**
   * fnDecl      -> Fn ID ParenOpen paramList? ParenClose block
   * @return {AST}
   */
  fnDecl() {
    let token = this.currentToken;
    this.eat(TT.Fn);
    let name = this.variable();
    this.eat(TT.ParenOpen);
    let params: Node[] = [];
    if (this.currentToken.type != TT.ParenClose) {
      params = this.paramList();
    }
    this.eat(TT.ParenClose);
    let body = this.block();
    return new FnDecl(token, name, params, body);
  }

  /**
   * block    -> CurlyOpen statementList CurlyClose
   * @return {ASTCompound}
   */
  block() {
    this.eat([TT.CurlyOpen]);
    let root = this.statementList([TT.CurlyClose]);
    this.eat([TT.CurlyClose]);
    return root;
  }

  /**
   * colonBlock -> Colon statementList endCheck
   * @param {string[]} endCheck
   * @param {string[]} endEat
   * @return {Compound}
   */
  colonBlock(endCheck: string[], endEat?: string[]) {
    endEat = endEat || endCheck;
    this.eat([TT.Colon]);
    let root = this.statementList(endCheck);
    if (endEat.includes(this.currentToken.type)) {
      this.eat(endEat);
    }
    return root;
  }

  /**
   * elseStatement  -> Else (ifStatement | controlBody)
   * @return {Node}
   */
  elseStatement() {
    let node: Node;
    this.eat([TT.Else]);
    if (this.currentToken.type === TT.If) {
      node = this.ifStatement();
    }
    else {
      node = this.controlBody(() => this.colonBlock([TT.EndIf]));
    }
    return node;
  }

  /**
   * controlCondition -> (ParenOpen expr ParenClose) | expr
   * @return {AST}
   */
  controlCondition() {
    let condition: Node;
    if (this.currentToken.type === TT.ParenOpen) {
      this.eat([TT.ParenOpen]);
      condition = this.expr();
      this.eat([TT.ParenClose]);
    }
    else {
      condition = this.expr();
    }
    return condition;
  }

  /**
   * controlbody -> block | colonBlock | statement
   * @param {Function} colonBodyCb
   * @return {Node}
   */
  controlBody(colonBodyCb: () => Node) {
    let body: Node;
    if (this.currentToken.type === TT.CurlyOpen) {
      body = this.block();
    }
    else if (this.currentToken.type == TT.Colon) {
      body = colonBodyCb();
    }
    else {
      if (this.currentToken.type == TT.OpArrow) {
        this.eat([TT.OpArrow]);
      }
      body = this.statement();
    }
    return body;
  }

  /**
   * ifStatement    -> If controlCondition controlBody [elseStatement]
   * @return {If}
   */
  ifStatement() {
    let condition: Node, nodeTrue: Node, nodeFalse: Node;
    let token = this.currentToken;

    this.eat([TT.If]);
    condition = this.controlCondition();
    nodeTrue = this.controlBody(() => this.colonBlock(
      [TT.EndIf, TT.Else],
      [TT.EndIf],
    ));

    // Else:
    if (this.currentToken.type == TT.Else) {
      nodeFalse = this.elseStatement();
    }

    return new If(token, condition, nodeTrue, nodeFalse);
  }

  /**
   * whileStatement    -> While controlCondition controlBody
   * @return {If}
   */
  whileStatement() {
    let token = this.currentToken;
    this.eat([TT.While]);
    return new While(
      token,
      this.controlCondition(),
      this.controlBody(() => this.colonBlock([TT.EndWhile])),
    );
  }

  textBlock() {
    let node = new TxtBlock(this.currentToken);
    this.eat(TT.TextBlock);
    return node;
  }

  /**
   * tetxProcessor -> Backtip block Backtip
   * @return {TxtProcessor}
   */
  textProcessor() {
    let node: TxtProcessor = new TxtProcessor(this.currentToken);
    this.eat(TT.Backtip);
    while (![TT.Backtip, TT.EoF].includes(this.currentToken.type)) {
      node.children.push(this.statement());
    }
    if (this.currentToken.type == TT.Backtip) {
      this.eat(TT.Backtip);
    }
    return node;
  }

  /**
   * statement  -> ifStatement | whileStatement
   *               | fnDecl
   *               | declaration
   *               | textProcessor | textBlock
   *               | empty
   *               | expr
   * @return {AST}
   */
  statement() {
    let node: Node = null;
    if (this.currentToken.type == TT.If) {
      node = this.ifStatement();
    }
    else if (this.currentToken.type == TT.While) {
      node = this.whileStatement();
    }
    else if (this.currentToken.type == TT.Fn) {
      node = this.fnDecl();
    }
    else if (
      [
        TT.ModConst, TT.ModVar,
        ...variableTypes,
      ].includes(this.currentToken.type)
    ) {
      node = this.declaration();
    }
    else if (this.currentToken.type == TT.Backtip) {
      node = this.textProcessor();
    }
    else if (this.currentToken.type == TT.TextBlock) {
      node = this.textBlock();
    }
    else if (this.currentToken.type == TT.Semi) {
      // TODO: Implement empty AST?
    }
    else {
      // console.log("expr");
      node = this.expr();
    }

    if (this.currentToken.type == TT.Semi) {
      this.eat(TT.Semi);
    }

    // You could prefer returns an ASTEmpty or something like that here if node is empty.
    return node;
  }

  /**
   * statementList -> statement*
   * @param {string[]} end
   * @return {Compound}
   */
  statementList(end: string[]) {
    let root = new Compound();
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
   * @return {Node}
   */
  script() {
    return this.statementList([TT.EoF]);
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

import AST, {ASTWithToken} from "./ASTNodes/AST";
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



const constantTypes = [
  TokenTypes.TypeBoolean,
  TokenTypes.TypeInteger,
  TokenTypes.TypeFloat,
  TokenTypes.TypeDouble,
  TokenTypes.TypeString,
];

const variableTypes = [
  TokenTypes.TypeAny,
  ...constantTypes
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
  TokenTypes.StringConstant
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
 * | Precedence level  Associativity  Operators
 * | 14                Left           ||             Logical or
 * | 13                Left           &&             Logical and
 * | 9                 Left           ==, !=         Equality
 * | 8                 Left           <, >, <=, >=   Relational
 * | 7                 Left           +, -           Plus and minus
 * | 6                 Left           *, /, %        Factor
 * | 5                 Left           !, +, -        Unary plus and minus
 * | 4                 Left (change)  ^, ¬/          Power
 * | 3                 Left           ¬/             Sqrt
 * | 2                 Left           ()             Function
 * v 1                 Left           ., []          Accessors
 *
 * script      -> (statement)*
 * statement   -> declaration
 *                | assignment
 *                | expr
 *                | empty
 * empty       ->
 *
 * declaration -> (constDecl | varDecl)
 * 
 * constDecl   -> ModConst typeSpec? commaDecl
 * varDecl     -> (ModVar | ModVar? typeSpec) commaDecl
 * 
 * commaDecl   -> declAssign (OpComma declAssign)*
 * 
 * declAssign  -> member (OpAssign (assign* | expr))?
 * 
 * assign      -> member ((
 *                  OpAssign
 *                  | OpPlusAssign
 *                  | OpMinusAssign
 *                  | OpMultiplicationAssign
 *                  | OpDivisionAssign
 *                  | OpModulusAssign
 *                  | OpPowAssign
 *                ) assignment* | expr)
 *
 * expr        -> or ((OpOr) or)*
 *                | member (OpIncrement | OpDecrement)
 * or          -> and ((OpAnd) and)*
 * and         -> equality ((OpEqual | OpNotEqual) equality)*
 * equality    -> relational (
 *                  (
 *                    OpGreaterThan
 *                    | OpLowerThan
 *                    | OpGreaterThanEqual
 *                    | OpLowerThanEqual
 *                  ) relational
 *                )*
 * relational  -> term ((OpPlus | OpMinus) term)*
 * term        -> pow ((OpMultiplication | OpDivision | OpModulus) pow)*
 * pow         -> factor (OpPow factor)*
 * factor      -> (OpPlus | OpMinus | OpNot | OpSqrt) factor
 *                //| (OpIncrement | OpDecrement) member                           // Pre.
 *                | (OpParenthesisOpen expr OpParenthesisClose)
 *                | constant
 *                | (OpIncrement | OpDecrement)? member funcCall?
 * member      -> variable (
 *                  OpDot variable
 *                  | OpArrayAccessorOpen expr OpArrayAccessorClose
 *                )*
 * variable    -> ID
 * funcCall    -> OpParenthesisOpen paramList? OpParenthesisClose
 * paramList   -> expr (opComma expr)*
 * constant    -> (BooleanConstant | (IntegerConstant | DecimalConstant) | StringConstant)
 * typeSpec    -> (TypeAny | TypeBoolean | TypeInteger | TypeFloat | TypeDouble | TypeString)
 */
export default class Parser {
  showDebug = false;

  currentToken: Token;

  lexer: Lexer;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    // this.eat();
  }



  error(message: string, me: any) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Ivalid syntax.");
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



  eat(tokenTypes: string|string[] = null, skipSpaces = true) {
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
      this.error(this.currentToken.type +" not in ", tokenTypes);
    }
  }

  operator(allowed: string|string[]) {
    this.debug("Get operator");
    let token = this.currentToken;
    this.eat(allowed);
    return token;
  }



  typeSpec() {
    let node = new ASTType(this.currentToken);
    this.eat(variableTypes);
    return node;
  }

  constant() {
    //console.log("this.currentToken", this.currentToken);
    let node;
    if (this.currentToken.type == TokenTypes.BooleanConstant) {
      node = new ASTBoolean(this.currentToken);
      this.eat(TokenTypes.BooleanConstant);
    }
    // Number:
    else if ([TokenTypes.IntegerConstant, TokenTypes.DecimalConstant].includes(this.currentToken.type)) {
      node = new ASTNumber(this.currentToken);
      this.eat([TokenTypes.IntegerConstant, TokenTypes.DecimalConstant]);
    }
    // String
    else if (this.currentToken.type == TokenTypes.StringConstant) {
      node = new ASTString(this.currentToken);
      this.eat(TokenTypes.StringConstant);
    }
    return node;
  }

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
   */
  member() {
    this.debug("Get member");

    // Get variable (Id).
    let node: AST = this.variable();
    let accessorOperators = [
      TokenTypes.OpDot,
      TokenTypes.OpArrayAccessorOpen
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
      else {
        right = this.variable();
      }

      node = new ASTBinaryOperator(
        node,
        // We expect the current token will be a "." (member accesor).
        operator,
        right
      );

      if (arrayAccessor) {
        this.eat(TokenTypes.OpArrayAccessorClose);
      }
    }

    return node;
  }

  /**
   * paramList   -> expr (OpComma expr)*
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
   */
  funcCall(): AST[] {
    // We eat the parenthesis opening (we can just ignore it).
    this.operator([TokenTypes.OpParenthesisOpen]); // Open.
    let nodes = this.paramList();
    // We eat the parenthesis closure (we can just ignore it).
    this.operator([TokenTypes.OpParenthesisClose]); // Close.
    return nodes;
  }

  /**
   * factor     -> (OpPlus | OpMinus | OpNot | OpSqrt) factor
   *               //| (OpIncrement | OpDecrement) variable                        // Pre.
   *               | (OpParenthesisOpen expr OpParenthesisClose)
   *               | constant
   *               | (OpIncrement | OpDecrement)? member funcCall?
   */
  factor(): AST|null {
    this.debug("Get factor");
    let node;
    // Unary operator + or -:
    let allowedOperators = [
      TokenTypes.OpMinus,
      TokenTypes.OpPlus,
      TokenTypes.OpNot,
      TokenTypes.OpSqrt
    ];

    if (allowedOperators.includes(this.currentToken.type)) {
      node = new ASTUnaryOperator(this.operator(allowedOperators), this.factor());
    }
    /*
    else if ([TokenTypes.OpIncrement, TokenTypes.OpDecrement].includes(this.currentToken.type)) {
      node = new ASTUnaryOperator(
        this.operator([TokenTypes.OpIncrement, TokenTypes.OpDecrement]),
        this.variable()
      );
    }
    */
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
    else if (availableConstants.includes(this.currentToken.type)) {
      node = this.constant();
    }
    else /*if (this.currentToken.type == TokenTypes.Id)*/ {
      let preOp;
      if ([TokenTypes.OpIncrement, TokenTypes.OpDecrement].includes(this.currentToken.type)) {
        preOp = this.operator([TokenTypes.OpIncrement, TokenTypes.OpDecrement]);
      }
      node = this.member();
      if ([TokenTypes.OpParenthesisOpen].includes(this.currentToken.type)) {
        node = new ASTFunctionCall(
          node,
          this.funcCall(),
        );
      }
      if (preOp) {
        node = new ASTUnaryOperator(
          preOp,
          node
        );
      }
    }
    
    return node;
  }

  /**
   * pow -> factor (OpPow factor)*
   */
  pow() {
    this.debug("Get pow");
    
    /* We expect the current token to be a number (1, 14, 1.4...) or a parenthesis opening
    containing an expression. */
    let node = this.factor();
    let token = this.currentToken;
  
    if (token.type === TokenTypes.OpPow) {
      this.eat(TokenTypes.OpPow);
      node = new ASTBinaryOperator(node, token, this.pow()); // Note the recursive call to pow here
    }
  
    return node;
  }

  /**
   * term -> pow ((OpMultiplication | OpDivision | OpModulus) pow)*
   */
  term() {
    this.debug("Get term");

    /* We expect the current token to be a number (1, 14, 1.4...) or a parenthesis opening
    containing an expression. */
    let node = this.pow();
    let allowedOperators = [
      TokenTypes.OpMultiplication,
      TokenTypes.OpDivision,
      TokenTypes.OpModulus,
    ];

    while (allowedOperators.includes(this.currentToken.type)) {
      node = new ASTBinaryOperator(
        node,
        // We expect the current token to be an arithmetic operator token (+, -, * or /).
        this.operator(allowedOperators),
        /* We expect the current token to be a number (1, 14, 1.4...) or a factor opening containing
        an expression. */
        this.pow()
      );
    }

    return node;
  }

  /**
   * relational -> term ((OpPlus | OpMinus) term)*
   */
  relational() {
    this.debug("Get relational");

    // We expect the current token to be a number (1, 14, 1.4...).
    let node = this.term();
    let allowedOperators = [
      TokenTypes.OpPlus,
      TokenTypes.OpMinus
    ];

    while (allowedOperators.includes(this.currentToken.type)) {
      node = new ASTBinaryOperator(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator(allowedOperators),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.term()
      );
    }

    return node;
  }

  /**
   * equality -> relational (
   *               (OpGreaterThan | OpLowerThan | OpGreaterThanEqual | OpLowerThanEqual) relational
   *             )*
   */
  equality() {
    this.debug("Get equality");
    
    // We expect the current token to be a number (1, 14, 1.4...).
    let node = this.relational();

    let allowedOperators = [
      TokenTypes.OpGreaterThan,
      TokenTypes.OpGreaterThanEqual,
      TokenTypes.OpLowerThan,
      TokenTypes.OpLowerThanEqual,
    ];

    while (allowedOperators.includes(this.currentToken.type)) {
      node = new ASTBinaryOperator(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator(allowedOperators),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.relational()
      );
    }

    return node;
  }

  /**
   * and -> equality ((OpEqual | OpNotEqual) equality)*
   */
  and() {
    this.debug("Get and");

    // We expect the current token to be a number (1, 14, 1.4...).
    let node = this.equality();
    let allowedOperators = [
      TokenTypes.OpEqual,
      TokenTypes.OpNotEqual,
      TokenTypes.OpLaxEqual,
      TokenTypes.OpLaxNotEqual,
    ];

    while (allowedOperators.includes(this.currentToken.type)) {
      node = new ASTBinaryOperator(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator(allowedOperators),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.equality()
      );
    }

    return node;
  }

  /**
   * or -> and ((OpAnd) and)*
   */
  or() {
    this.debug("Get or");

    // We expect the current token to be a number (1, 14, 1.4...).
    let node = this.and();

    while (TokenTypes.OpAnd == this.currentToken.type) {
      node = new ASTBinaryOperator(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator([TokenTypes.OpAnd]),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.and()
      );
    }

    return node;
  }

  /**
   * expr -> or ((OpOr) or)*
   */
  expr() {
    this.debug("Get expr");

    // We expect the current token to be a number (1, 14, 1.4...).
    let node = this.or();
    
    while (TokenTypes.OpOr == this.currentToken.type) {
      node = new ASTBinaryOperator(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator([TokenTypes.OpOr]),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.or()
      );
    }

    return node;
  }

  /**
   * assign     -> member (
   *                 OpAssign
   *                 | OpPlusAssign
   *                 | OpMinusAssign
   *                 | OpMultiplicationAssign
   *                 | OpDivisionAssign
   *                 | OpModulusAssign
   *                 | OpPowAssign
   *               ) (assignment* | expr)
   */
  assign(): AST {
    this.debug("Get assign");
    let node = this.expr() as ASTWithToken;
    if (
      node && node.token && node.token.type == TokenTypes.Id
      && assignOperators.includes(this.currentToken.type)
    ) {
      node = new ASTAssign(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        this.operator(assignOperators),
        // We expect the current token to be a number (1, 14, 1.4...).
        this.assign()
      );
    }
    return node;
  }
  
  /**
   * First assign must use the simple assign operator.
   * declAssign  -> member (OpAssign assign)?
   */
  declAssign() {
    this.debug("Get declAssign");
    let node = this.member();
    if (this.currentToken.type == TokenTypes.OpAssign) {
      let operator = this.operator(TokenTypes.OpAssign);
      let right;
      if (this.currentToken.type == TokenTypes.Id) {
        right = this.assign();
      }
      else {
        right = this.expr();
      }
      node = new ASTAssign(
        node,
        // We expect the current token to be an arithmetic operator token (+ or -).
        operator,
        // We expect the current token to be a number (1, 14, 1.4...).
        right
      );
    }
    return node;
  }

  /**
   * commaDecl -> declAssign (OpComma declAssign)*
   */
  commaDecl() {
    this.debug("commaDecl");
    let declarationNodes = [
      this.declAssign()
    ];
    while (this.currentToken.type == TokenTypes.OpComma) {
      this.eat(TokenTypes.OpComma);
      declarationNodes.push(this.declAssign());
    }
    return declarationNodes;
  }

  /**
   * varDecl     -> (ModVar typeSpec? | ModVar? typeSpec) commaDecl
   */
  varDecl() {
    this.debug("varDecl");
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
   * constDecl   -> ModConst typeSpec? commaDecl
   */
  constDecl() {
    this.debug("constDecl");
    let root = new ASTConstantDeclaration();
    this.eat(TokenTypes.ModConst); // Required.
    
    if (constantTypes.includes(this.currentToken.type)) { // Optional.
      root.typeNode = this.typeSpec();
    }
    
    root.children = this.commaDecl();
    return root;
  }

  /**
   * declaration -> (constDecl | varDecl)?
   */
  declaration() {
    this.debug("declaration");
    let node = null;
    if (this.currentToken.type == TokenTypes.ModConst) {
      // Constant declaration
      node = this.constDecl();
    }
    else if ([TokenTypes.ModVar, ...variableTypes].includes(this.currentToken.type)) {
      node = this.varDecl();
    }
    return node;
  }

  /**
   * statement  -> declaration
   *               //| assign
   *               | expr
   *               | empty
   */
  statement() {
    this.debug("Get statement");
    let node: AST = this.declaration();

    if (!node) {
      //if (this.currentToken.type == TokenTypes.Id) {
        node = this.assign();
      //}
      //else {
        //node = this.expr();
      //}
    }

    // You could prefer returns an ASTEmpty or something like that here if node is empty.
    
    return node;
  }

  /**
   * script     -> (statement)*
   */
  script() {
    this.debug("Get script");
    let root = new ASTCompound();
    
    this.eat();
    let node = this.statement();
    if (node) { // For empty lines.
      root.children.push(node);
    }
    while (this.currentToken.type == TokenTypes.OpSemicolon) {
      this.eat(TokenTypes.OpSemicolon);
      if (this.currentToken.type !== TokenTypes.EoF) {
        node = this.statement();
        if (node) { // For empty lines.
          root.children.push(node);
        }
      }
    }
    console.log("root", root);
    return root;
  }



  parse() {
    return this.script();
  }
}

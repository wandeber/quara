import AST from "./AST";
import ASTBinaryOperator from "./ASTBinaryOperator";
import ASTVariable from "./ASTVariable";
import Token from "../Token";
import ASTFunctionCall from "./ASTFunctionCall";
import ASTString from "./ASTString";
import ASTChar from "./ASTChar";
import ASTUnaryOperator from "./ASTUnaryOperator";
import ASTVariableDeclaration from "./ASTVariableDeclaration";
import TokenTypes from "../TokenTypes";
import ASTType from "./ASTType";
import ASTCompound from "./ASTCompound";



describe("AST toString methods", () => {
  let ast = new AST();
  let tokenName = new Token(TokenTypes.Id, "a");
  let tokenInt = new Token(TokenTypes.TypeInteger, "int");
  let tokenPlus = new Token("+", "+");
  let astTypeInt = new ASTType(tokenInt);
  let astVariable = new ASTVariable(tokenName);
  let binaryOp = new ASTBinaryOperator(astVariable, tokenPlus, astVariable);
  let funcCall = new ASTFunctionCall(astVariable, [astVariable, astVariable]);
  let astValue = new ASTString(tokenName);
  let unaryOp = new ASTUnaryOperator(tokenPlus, astVariable);
  let declaration = new ASTVariableDeclaration(astTypeInt);
  declaration.children.push(astVariable);

  let compound = new ASTCompound();
  compound.children.push(astTypeInt);
  compound.children.push(astVariable);

  let astChar = new ASTChar(tokenName);

  it("AST", () => expect(ast.toString()).toBe("AST"));
  it("ASTBinaryOperator", () => expect(binaryOp.toString()).toBe("a + a"));
  it("ASTFunctionCall", () => expect(funcCall.toString()).toBe("a(a, a)"));
  it("ASTString", () => expect(astValue.toString()).toBe("a"));
  it("ASTUnaryOperator", () => expect(unaryOp.toString()).toBe("+a"));
  it("ASTVariableDeclaration", () => expect(declaration.toString()).toBe("var int a"));
  it("ASTCompound", () => expect(compound.toString()).toBe("ASTCompound"));
  it("ASTChar", () => expect(astChar.toString()).toBe("a"));
});

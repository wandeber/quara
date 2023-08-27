import AST, {IAST} from "./AST";
import {IASTVisitor} from "../Interpreter/ASTVisitor";
import {IASTInterpreter} from "../Interpreter/ASTInterpreter";
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

// Mock para ASTVisitor
class MockVisitor implements IASTVisitor {
  interpreter: IASTInterpreter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visit(node: IAST): any {
    return "visited";
  }
}

describe("AST class", () => {
  let ast: IAST, mockVisitor: MockVisitor;

  beforeEach(() => {
    ast = new AST();
    mockVisitor = new MockVisitor();
  });

  test("accept method should call visitor.visit", () => {
    // Espía el método visit del mockVisitor
    const spy = jest.spyOn(mockVisitor, "visit");
    // Llama al método accept
    const result = ast.accept(mockVisitor);
    // Verifica que visit se ha llamado con el objeto AST
    expect(spy).toHaveBeenCalledWith(ast);
    // Verifica que accept devuelve lo que visit devuelve
    expect(result).toBe("visited");
  });

  test("toString method should return an empty string", () => {
    expect(ast.toString()).toBe("");
  });
});

describe("AST toString methods", () => {
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

  test("ASTBinaryOperator", () => expect(binaryOp.toString()).toBe("a + a"));
  test("ASTFunctionCall", () => expect(funcCall.toString()).toBe("a(a, a)"));
  test("ASTString", () => expect(astValue.toString()).toBe("a"));
  test("ASTUnaryOperator", () => expect(unaryOp.toString()).toBe("+a"));
  test("ASTVariableDeclaration", () => expect(declaration.toString()).toBe("int a"));
  test("ASTCompound", () => expect(compound.toString()).toBe("int, a"));
  test("ASTChar", () => expect(astChar.toString()).toBe("a"));
});

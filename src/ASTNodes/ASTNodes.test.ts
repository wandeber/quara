import {TT} from "../TokenTypes";
import {Token} from "../Token";
import {Node} from "./ASTNode";
import {BinOperator} from "./BinOperator";
import {Variable} from "./Variable";
import {FnCall} from "./FnCall";
import {Str} from "./Str";
import {Char} from "./Char";
import {UnaryOperator} from "./UnaryOperator";
import {VarDecl} from "./VarDecl";
import {Type} from "./Type";
import {Compound} from "./Compound";



describe("AST nodes toString methods", () => {
  let node = new Node();
  let tokenName = new Token(TT.Id, "a");
  let tokenInt = new Token(TT.TInt, "int");
  let tokenPlus = new Token("+", "+");
  let nodeTypeInt = new Type(tokenInt);
  let nodeVariable = new Variable(tokenName);
  let binaryOp = new BinOperator(nodeVariable, tokenPlus, nodeVariable);
  let funcCall = new FnCall(nodeVariable, [nodeVariable, nodeVariable]);
  let nodeValue = new Str(tokenName);
  let unaryOp = new UnaryOperator(tokenPlus, nodeVariable);
  let declaration = new VarDecl(nodeTypeInt);
  declaration.children.push(nodeVariable);

  let compound = new Compound();
  compound.children.push(nodeTypeInt);
  compound.children.push(nodeVariable);

  let astChar = new Char(tokenName);

  it("Node", () => expect(node.toString()).toBe("Node"));
  it("BiOperator", () => expect(binaryOp.toString()).toBe("a + a"));
  it("FnCall", () => expect(funcCall.toString()).toBe("a(a, a)"));
  it("Str", () => expect(nodeValue.toString()).toBe("a"));
  it("UnaryOperator", () => expect(unaryOp.toString()).toBe("+a"));
  it("VarDecl", () => expect(declaration.toString()).toBe("var int a"));
  it("Compound", () => expect(compound.toString()).toBe("Compound"));
  it("Char", () => expect(astChar.toString()).toBe("a"));
});

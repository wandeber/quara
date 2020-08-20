import ASTAssign from "./ASTAssign";
import ASTBinaryOperator from "./ASTBinaryOperator";
import ASTBoolean from "./ASTBoolean";
import ASTChar from "./ASTChar";
import ASTCompound from "./ASTCompound";
import ASTConstantDeclaration from "./ASTConstantDeclaration";
import ASTNumber from "./ASTNumber";
import ASTString from "./ASTString";
import ASTType from "./ASTType";
import ASTUnaryOperator from "./ASTUnaryOperator";
import ASTVariable from "./ASTVariable";
import ASTVariableDeclaration from "./ASTVariableDeclaration";





export default class ASTVisitor {
  visitASTAssign(node: ASTAssign): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTBinaryOperator(node: ASTBinaryOperator): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTBoolean(node: ASTBoolean): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTChar(node: ASTChar): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTCompound(node: ASTCompound): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTConstantDeclaration(node: ASTConstantDeclaration): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTNumber(node: ASTNumber): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTString(node: ASTString): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTType(node: ASTType): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTUnaryOperator(node: ASTUnaryOperator): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTVariable(node: ASTVariable): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }

  visitASTVariableDeclaration(node: ASTVariableDeclaration): any {
    console.error("Non processable node", node);
    throw new Error(`${node.constructor.name} not implemented.`);
  }
}

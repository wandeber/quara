import ASTTextProcessor from "../ASTNodes/ASTTextProcessor";
import ASTVisitor from "./ASTVisitor";



export default class ASTTextProcessorVisitor extends ASTVisitor {
  visit(node: ASTTextProcessor) {
    let result: string = "";
    for (let child of node.children) {
      // result.push(child.accept(this.interpreter));
      let childResult = this.interpreter.visit(child);
      if (childResult) {
        result += childResult;
      }
    }
    return result;
  }
}

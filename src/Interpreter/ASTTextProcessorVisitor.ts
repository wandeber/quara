// import ASTWithValue from "../ASTNodes/ASTWithValue";
import ASTTextProcessor from "../ASTNodes/ASTTextProcessor";
import ASTVisitor from "./ASTVisitor";
// import ASTVariable from "../ASTNodes/ASTVariable";
// import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
// import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
// import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
// import ASTTextBlock from "../ASTNodes/ASTTextBlock";
// import ASTIf from "../ASTNodes/ASTIf";
// import ASTWhile from "../ASTNodes/ASTWhile";



export default class ASTTextProcessorVisitor extends ASTVisitor {
  visit(node: ASTTextProcessor) {
    let result: string = "";
    // this.interpreter.textProcessorMode = true;
    for (let child of node.children) {
      // result.push(child.accept(this.interpreter));
      let childResult = this.interpreter.visit(child);
      /*
      if (
        (
          child instanceof ASTWithValue
          || child instanceof ASTVariable
          || child instanceof ASTFunctionCall
          // || child instanceof ASTBinaryOperator // Includes assignment...
          || child instanceof ASTUnaryOperator
          || child instanceof ASTTextBlock
          || child instanceof ASTIf
          || child instanceof ASTWhile
        )
        && typeof childResult != "undefined"
      ) {
      */
      result += childResult;
      // }
    }
    // this.interpreter.textProcessorMode = false;
    return result;
  }
}

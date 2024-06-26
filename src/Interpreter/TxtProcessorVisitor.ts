// import ASTWithValue from "../ASTNodes/ASTWithValue";
import {TxtProcessor} from "../ASTNodes/TxtProcessor";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";
// import ASTVariable from "../ASTNodes/ASTVariable";
// import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
// import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
// import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
// import ASTTextBlock from "../ASTNodes/ASTTextBlock";
// import ASTIf from "../ASTNodes/ASTIf";
// import ASTWhile from "../ASTNodes/ASTWhile";



export class TxtProcessorVisitor extends ASTVisitor {
  visit(node: TxtProcessor, scope: Scope): IVisitorResult {
    // let result: any;
    let output = "";
    // this.interpreter.textProcessorMode = true;
    for (let child of node.children) {
      // result.push(child.accept(this.interpreter));
      let childResult = this.engine.visit(child, scope);
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
      // result = childResult.value;
      if (childResult.output) {
        output += childResult.output;
      }
      // }
    }
    // this.interpreter.textProcessorMode = false;
    return {
      value: output,
      output,
    };
  }
}

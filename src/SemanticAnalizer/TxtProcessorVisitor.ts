import {TxtProcessor} from "../ASTNodes/TxtProcessor";
import {ASTVisitor} from "../ASTVisitor";



export class TxtProcessorVisitor extends ASTVisitor {
  visit(node: TxtProcessor) {
    console.log("TxtProcessorVisitor", node);
  }
}

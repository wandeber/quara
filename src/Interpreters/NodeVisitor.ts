import AST from "../ASTNodes/AST";

export default class NodeVisitor {
  [key: string]: any;
  

  visit(node: AST): any {
    let methodName: string = this.getVisitMethodName(node);
    if (typeof this[methodName] !== "function") {
      methodName = "genericVisit";
    }
    return this[methodName](node);
  }

  genericVisit(node: AST): void {
    let methodName = this.getVisitMethodName(node);
    throw new Error(`Visit method ${methodName} doesn't exists.`);
  }

  getVisitMethodName(node: any): string {
    let methodName;
    if (typeof node === "object" && node.constructor && node.constructor.name) {
      methodName = "visit_"+ node.constructor.name;
    }
    return methodName;
  }
}

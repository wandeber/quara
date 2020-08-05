"use strict";





class NodeVisitor {
  visit(node) {
    let methodName = this.getVisitMethodName(node);
    
    if (typeof this[methodName] !== "function") {
      methodName = "genericVisit";
    }

    return this[methodName](node);
  }

  genericVisit(node) {
    let methodName = this.getVisitMethodName(node);
    throw new Error(`Visit method ${methodName} doesn't exists.`);
  }

  getVisitMethodName(node) {
    let methodName;
    if (typeof node === "object" && node.constructor && node.constructor.name) {
      methodName = "visit_"+ node.constructor.name;
    }
    return methodName;
  }
}



module.exports = {NodeVisitor};

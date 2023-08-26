




/**
 * Translates input to Lisp.
 * Example:
 *   (2 + 3 * 5)   ->    (+ 2 (* 3 5)).
 */
class LispTranslator {
  constructor(parser) {
    super();
    this.showDebug = false;
    this.parser = parser;
  }



  error(message, me) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Ivalid syntax.");
  }
  
  debug(message = "") {
    if (this.showDebug) {
      this.lexer.debug(message);
      console.log("-- LispTranslator: "+ message);
      if (this.currentToken) {
        console.log("  current token - "+ this.currentToken.type +" - "+ this.currentToken.value);
      }
    }
  }



  visit_ASTBinaryOperator(node) {
    return "("+ node.operator.value +" "+ this.visit(node.left) +" "+ this.visit(node.right) +")";
  }

  visit_ASTNumber(node) {
    return node.value;
  }



  interpret() {
    let tree = this.parser.parse();
    return this.visit(tree);
  }
}



module.exports = {LispTranslator};
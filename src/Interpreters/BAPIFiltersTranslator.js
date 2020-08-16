

import NodeVisitor from "./NodeVisitor";
import TokenTypes from "../Token";




/*
$filter = [
  'and' => [
    [
      'field' => 'fieldName',
      'value' => 'any value',
      'operator' => '=' // <>, <, >, <=, >=
    ],
    [
      'or' => [
        [
          'field' => 'fieldName',
          'value' => 'any value',
          'operator' => '=' // <>, <, >, <=, >=
        ],
        [
          'field' => 'fieldName',
          'value' => 'any value',
          'operator' => '=' // <>, <, >, <=, >=
        ]
      ]
    ]
  ]
];
*/
class BAPIFiltersTranslator extends NodeVisitor {
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
      console.log("-- BAPIFiltersTranslator: "+ message);
      if (this.currentToken) {
        console.log("  current token - "+ this.currentToken.type +" - "+ this.currentToken.value);
      }
    }
  }



  /* eslint-disable-next-line max-lines-per-function */
  visit_ASTBinaryOperator(node) {
    let result;

    if (node.operator.type == TokenTypes.OpPlus) {
      result = {
        left: this.visit(node.left), 
        operator: "+",
        right: this.visit(node.right)
      };
      //result = this.visit(node.left) + this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = {
        left: this.visit(node.left), 
        operator: "-",
        right: this.visit(node.right)
      };
      //result = this.visit(node.left) - this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpMultiplication) {
      result = {
        left: this.visit(node.left), 
        operator: "*",
        right: this.visit(node.right)
      };
      //result = this.visit(node.left) * this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpDivision) {
      result = {
        left: this.visit(node.left), 
        operator: "/",
        right: this.visit(node.right)
      };
      //result = this.visit(node.left) / this.visit(node.right);
    }
    else if (node.operator.type == TokenTypes.OpModulus) {
      result = this.visit(node.left) % this.visit(node.right);
    }

    else if (node.operator.type == TokenTypes.OpEqual) {
      result = {
        left: this.visit(node.left), 
        operator: "=",
        right: this.visit(node.right)
      };
    }
    else if (node.operator.type == TokenTypes.OpNotEqual) {
      result = {
        left: this.visit(node.left), 
        operator: "<>",
        right: this.visit(node.right)
      };
    }
    else if (node.operator.type == TokenTypes.OpLowerThan) {
      result = {
        left: this.visit(node.left), 
        operator: "<",
        right: this.visit(node.right)
      };
    }
    else if (node.operator.type == TokenTypes.OpGreaterThan) {
      result = {
        left: this.visit(node.left), 
        operator: ">",
        right: this.visit(node.right)
      };
    }
    else if (node.operator.type == TokenTypes.OpLowerThanEqual) {
      result = {
        left: this.visit(node.left), 
        operator: "<=",
        right: this.visit(node.right)
      };
    }
    else if (node.operator.type == TokenTypes.OpGreaterThanEqual) {
      result = {
        left: this.visit(node.left), 
        operator: ">=",
        right: this.visit(node.right)
      };
    }

    else if (node.operator.type == TokenTypes.OpAnd) {
      result = {and: [this.visit(node.left), this.visit(node.right)]};
    }
    else if (node.operator.type == TokenTypes.OpOr) {
      result = {or: [this.visit(node.left), this.visit(node.right)]};
    }
    
    return result;
  }

  visit_ASTUnaryOperator(node) {
    let result;

    if (node.operator.type == TokenTypes.OpPlus) {
      result = this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = -this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpNot) {
      result = {
        left: this.visit(node.expr), 
        operator: "=",
        right: false
      };
      // TODO: ¿Añadir OR ... IS NULL OR ... = 0?
    }
    
    return result;
  }

  visit_ASTBoolean(node) {
    return node.value;
  }

  visit_ASTNumber(node) {
    return node.value;
  }

  visit_ASTString(node) {
    return node.value;
  }



  interpret() {
    let tree = this.parser.parse();
    if (tree) {
      return this.visit(tree);
    }
    return false;
  }
}



module.exports = {BAPIFiltersTranslator};

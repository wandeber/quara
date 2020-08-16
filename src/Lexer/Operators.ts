import Token from "../Token";
import TokenTypes from "../TokenTypes";





export const Operators = new Map<string, Token>();
Operators.set("!", new Token(TokenTypes.OpNot, "!"));
Operators.set("$not", new Token(TokenTypes.OpNot, "!"));
Operators.set("||", new Token(TokenTypes.OpOr, "||"));
Operators.set("$or", new Token(TokenTypes.OpOr, "||"));
Operators.set("&&", new Token(TokenTypes.OpAnd, "&&"));
Operators.set("$and", new Token(TokenTypes.OpAnd, "&&"));
Operators.set("==", new Token(TokenTypes.OpEqual, "==")); // ==)=
Operators.set("$eq", new Token(TokenTypes.OpEqual, "==")); // ==)=
Operators.set("!=", new Token(TokenTypes.OpNotEqual, "!=")); // !=)=
Operators.set("<>", new Token(TokenTypes.OpNotEqual, "!=")); // !=)=
Operators.set("$ne", new Token(TokenTypes.OpNotEqual, "!=")); // !=)=
Operators.set("~=", new Token(TokenTypes.OpLaxEqual, "~=")); // Lax equality: == without type checking).
Operators.set("$leq", new Token(TokenTypes.OpLaxEqual, "~=")); // Lax equality: == without type checking).
Operators.set("!~=", new Token(TokenTypes.OpLaxNotEqual, "!~=")); // Lax: != without type checking).
Operators.set("$lne", new Token(TokenTypes.OpLaxNotEqual, "!~=")); // Lax: != without type checking).
Operators.set("<", new Token(TokenTypes.OpLowerThan, "<"));
Operators.set("$lt", new Token(TokenTypes.OpLowerThan, "<"));
Operators.set(">", new Token(TokenTypes.OpGreaterThan, ">"));
Operators.set("$gt", new Token(TokenTypes.OpGreaterThan, ">"));
Operators.set("<=", new Token(TokenTypes.OpLowerThanEqual, "<="));
Operators.set("$lte", new Token(TokenTypes.OpLowerThanEqual, "<="));
Operators.set(">=", new Token(TokenTypes.OpGreaterThanEqual, ">="));
Operators.set("$gte", new Token(TokenTypes.OpGreaterThanEqual, ">="));
Operators.set("+", new Token(TokenTypes.OpPlus, "+"));
Operators.set("-", new Token(TokenTypes.OpMinus, "-"));
Operators.set("*", new Token(TokenTypes.OpMultiplication, "*"));
Operators.set("/", new Token(TokenTypes.OpDivision, "/"));
Operators.set("%", new Token(TokenTypes.OpModulus, "%"));
Operators.set("^", new Token(TokenTypes.OpPow, "^"));
Operators.set("**", new Token(TokenTypes.OpPow, "^"));
Operators.set("¬/", new Token(TokenTypes.OpSqrt, "¬/"));
Operators.set("++", new Token(TokenTypes.OpIncrement, "++"));
Operators.set("--", new Token(TokenTypes.OpDecrement, "--"));
Operators.set("=", new Token(TokenTypes.OpAssign, "="));
Operators.set("+=", new Token(TokenTypes.OpPlusAssign, "+="));
Operators.set("-=", new Token(TokenTypes.OpMinusAssign, "-="));
Operators.set("*=", new Token(TokenTypes.OpMultiplicationAssign, "*="));
Operators.set("/=", new Token(TokenTypes.OpDivisionAssign, "/="));
Operators.set("%=", new Token(TokenTypes.OpModulusAssign, "%="));
Operators.set("^=", new Token(TokenTypes.OpPowAssign, "^="));
Operators.set("**=", new Token(TokenTypes.OpPowAssign, "^="));
Operators.set("(", new Token(TokenTypes.OpParenthesisOpen, "("));
Operators.set(")", new Token(TokenTypes.OpParenthesisClose, ")"));
Operators.set(".", new Token(TokenTypes.OpDot, "."));
Operators.set("[", new Token(TokenTypes.OpArrayAccessorOpen, "["));
Operators.set("]", new Token(TokenTypes.OpArrayAccessorClose, "]"));
Operators.set(";", new Token(TokenTypes.OpSemicolon, ";"));
Operators.set(",", new Token(TokenTypes.OpComma, ","));
Operators.set("\"", new Token(TokenTypes.OpQuote, "\""));

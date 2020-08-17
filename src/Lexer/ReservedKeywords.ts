import Token from "../Token";
import TokenTypes from "../TokenTypes";





export const ReservedKeywords = new Map<string, Token>();
ReservedKeywords.set("true", new Token(TokenTypes.BooleanConstant, true));
ReservedKeywords.set("false", new Token(TokenTypes.BooleanConstant, false));
ReservedKeywords.set("const", new Token(TokenTypes.ModConst, "const"));
ReservedKeywords.set("var", new Token(TokenTypes.ModVar, "var"));
ReservedKeywords.set("any", new Token(TokenTypes.TypeAny, "any"));
//ReservedKeywords.set("char", new Token(TokenTypes.TypeChar, "char"));
ReservedKeywords.set("int", new Token(TokenTypes.TypeInteger, "int"));
ReservedKeywords.set("integer", new Token(TokenTypes.TypeInteger, "int"));
ReservedKeywords.set("float", new Token(TokenTypes.TypeFloat, "float"));
ReservedKeywords.set("double", new Token(TokenTypes.TypeDouble, "double"));
ReservedKeywords.set("string", new Token(TokenTypes.TypeString, "string"));
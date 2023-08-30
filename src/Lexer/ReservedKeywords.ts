import Token from "../Token";
import TokenTypes from "../TokenTypes";





export const ReservedKeywords = new Map<string, Token>();
ReservedKeywords.set("true", new Token(TokenTypes.BooleanConstant, true));
ReservedKeywords.set("false", new Token(TokenTypes.BooleanConstant, false));
ReservedKeywords.set("const", new Token(TokenTypes.ModConst, "const"));
ReservedKeywords.set("var", new Token(TokenTypes.ModVar, "var"));
ReservedKeywords.set("any", new Token(TokenTypes.TypeAny, "any"));
ReservedKeywords.set("char", new Token(TokenTypes.TypeChar, "char"));
ReservedKeywords.set("int", new Token(TokenTypes.TypeInteger, "int"));
ReservedKeywords.set("integer", new Token(TokenTypes.TypeInteger, "int"));
ReservedKeywords.set("float", new Token(TokenTypes.TypeFloat, "float"));
ReservedKeywords.set("double", new Token(TokenTypes.TypeDouble, "double"));
ReservedKeywords.set("string", new Token(TokenTypes.TypeString, "string"));
ReservedKeywords.set("bool", new Token(TokenTypes.TypeBoolean, "bool"));
ReservedKeywords.set("boolean", new Token(TokenTypes.TypeBoolean, "boolean"));
ReservedKeywords.set("if", new Token(TokenTypes.If, "if"));
ReservedKeywords.set("endif", new Token(TokenTypes.EndIf, "endif"));
ReservedKeywords.set("else", new Token(TokenTypes.Else, "else"));
ReservedKeywords.set("while", new Token(TokenTypes.While, "while"));
ReservedKeywords.set("endwhile", new Token(TokenTypes.EndWhile, "endwhile"));

// Pending
ReservedKeywords.set("for", new Token(TokenTypes.For, "for"));
ReservedKeywords.set("endfor", new Token(TokenTypes.EndFor, "endfor"));
ReservedKeywords.set("each", new Token(TokenTypes.Each, "each"));
ReservedKeywords.set("in", new Token(TokenTypes.In, "in"));
ReservedKeywords.set("endeach", new Token(TokenTypes.EndEach, "endeach"));
ReservedKeywords.set("function", new Token(TokenTypes.Function, "function"));
ReservedKeywords.set("return", new Token(TokenTypes.Return, "return"));
ReservedKeywords.set("endfunction", new Token(TokenTypes.EndFunction, "endfunction"));
ReservedKeywords.set("class", new Token(TokenTypes.Class, "class"));
ReservedKeywords.set("endclass", new Token(TokenTypes.EndClass, "endclass"));
ReservedKeywords.set("get", new Token(TokenTypes.Get, "get"));
ReservedKeywords.set("set", new Token(TokenTypes.Set, "set"));
ReservedKeywords.set("static", new Token(TokenTypes.Static, "static"));
ReservedKeywords.set("abstract", new Token(TokenTypes.Abstract, "abstract"));
ReservedKeywords.set("private", new Token(TokenTypes.Private, "private"));
ReservedKeywords.set("public", new Token(TokenTypes.Public, "public"));
ReservedKeywords.set("protected", new Token(TokenTypes.Protected, "protected"));
ReservedKeywords.set("extends", new Token(TokenTypes.Extends, "extends"));
ReservedKeywords.set("interface", new Token(TokenTypes.Interface, "interface"));
ReservedKeywords.set("endinterface", new Token(TokenTypes.EndInterface, "endinterface"));
ReservedKeywords.set("implements", new Token(TokenTypes.Implements, "implements"));

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
// ReservedKeywords.set("/if", new Token(TokenTypes.EndIf, "/if"));
ReservedKeywords.set("else", new Token(TokenTypes.Else, "else"));
ReservedKeywords.set("while", new Token(TokenTypes.While, "while"));
// ReservedKeywords.set("/while", new Token(TokenTypes.EndWhile, "/while"));

// Pending
ReservedKeywords.set("for", new Token(TokenTypes.For, "for"));
// ReservedKeywords.set("/for", new Token(TokenTypes.EndFor, "/for"));
ReservedKeywords.set("each", new Token(TokenTypes.Each, "each"));
ReservedKeywords.set("in", new Token(TokenTypes.In, "in"));
// ReservedKeywords.set("/each", new Token(TokenTypes.EndEach, "/each"));
ReservedKeywords.set("function", new Token(TokenTypes.Function, "function"));
ReservedKeywords.set("return", new Token(TokenTypes.Return, "return"));
// ReservedKeywords.set("/function", new Token(TokenTypes.EndFunction, "/function"));
ReservedKeywords.set("class", new Token(TokenTypes.Class, "class"));
// ReservedKeywords.set("/class", new Token(TokenTypes.EndClass, "/class"));
ReservedKeywords.set("get", new Token(TokenTypes.Get, "get"));
ReservedKeywords.set("set", new Token(TokenTypes.Set, "set"));
ReservedKeywords.set("static", new Token(TokenTypes.Static, "static"));
ReservedKeywords.set("virtual", new Token(TokenTypes.Abstract, "abstract"));
ReservedKeywords.set("final", new Token(TokenTypes.Final, "final"));
ReservedKeywords.set("virtual", new Token(TokenTypes.Virtual, "virtual"));
ReservedKeywords.set("private", new Token(TokenTypes.Private, "private"));
ReservedKeywords.set("public", new Token(TokenTypes.Public, "public"));
ReservedKeywords.set("protected", new Token(TokenTypes.Protected, "protected"));
ReservedKeywords.set("extends", new Token(TokenTypes.Extends, "extends"));
ReservedKeywords.set("interface", new Token(TokenTypes.Interface, "interface"));
// ReservedKeywords.set("/interface", new Token(TokenTypes.EndInterface, "/interface"));
ReservedKeywords.set("implements", new Token(TokenTypes.Implements, "implements"));

/*
Operators:
Arithmetic operators:
  +, -, *, /
Logic operators:
  $eq, $ne, $lt, $gt, $lte, $gte, $and, $or
  ==, !=, <>, <, >, <=, >=, &&, ||
Other:
  (, )
*/



export default class TokenTypes {
  // static readonly OpTextProcessorStart = "OpTextProcessorStart";
  // static readonly OpTextProcessorEnd = "OpTextProcessorEnd";
  static readonly Backtip = "Backtip"; // `
  static readonly Id = "Id";
  static readonly Space = "Space"; // " "
  static readonly Dot = "Dot"; // .

  static readonly ModVar = "TypeVar";
  static readonly ModConst = "TypeConst";

  static readonly TypeAny = "TypeAny";
  static readonly TypeBoolean = "TypeBoolean";
  static readonly TypeChar = "TypeChar";
  static readonly TypeInteger = "TypeInteger";
  static readonly TypeFloat = "TypeFloat";
  static readonly TypeDouble = "TypeDouble";
  static readonly TypeString = "TypeString";

  static readonly BooleanConstant = "BooleanConstant"; // true, false
  static readonly CharConstant = "CharConstant";
  static readonly IntegerConstant = "IntegerConstant"; // 1
  static readonly DecimalConstant = "DecimalConstant"; // 1.1
  static readonly StringConstant = "StringConstant";

  static readonly TextBlock = "TextBlock";

  static readonly OpPlus = "OpPlus"; // "+"
  static readonly OpMinus = "OpMinus"; // "-"
  static readonly OpMultiplication = "OpMultiplication"; // "*"
  static readonly OpDivision = "OpDivision"; // "/"
  static readonly OpModulus = "OpModulus"; // %
  static readonly OpPow = "OpPow"; // ^, **
  static readonly OpSqrt = "OpSqrt"; // ¬/

  static readonly OpIncrement = "OpIncrement"; // ++
  static readonly OpDecrement = "OpDecrement"; // --

  static readonly OpNot = "Not";
  static readonly OpEqual = "OpEqual";
  static readonly OpLaxEqual = "OpLaxEqual";
  static readonly OpNotEqual = "OpNotEqual";
  static readonly OpLaxNotEqual = "OpLaxNotEqual";
  static readonly OpLowerThan = "OpLowerThan";
  static readonly OpGreaterThan = "OpGreaterThan";
  static readonly OpLowerThanEqual = "OpLowerThanEqual";
  static readonly OpGreaterThanEqual = "OpGreaterThanEqual";

  static readonly OpAnd = "OpAnd";
  static readonly OpOr = "OpOr";

  static readonly OpAssign = "OpAssign";
  static readonly OpPlusAssign = "OpPlusAssign";
  static readonly OpMinusAssign = "OpMinusAssign";
  static readonly OpMultiplicationAssign = "OpMultiplicationAssign";
  static readonly OpDivisionAssign = "OpDivisionAssign";
  static readonly OpModulusAssign = "OpModulusAssign";
  static readonly OpPowAssign = "OpPowAssign";

  static readonly OpDot = "OpDot";
  static readonly OpArrayAccessorOpen = "OpArrayAccessorOpen";
  static readonly OpArrayAccessorClose = "OpArrayAccessorClose";
  static readonly OpSemicolon = "OpSemicolon";
  static readonly OpColon = "OpColon";
  static readonly OpQuote = "OpQuote";
  static readonly OpComma = "OpComma";
  static readonly OpArrow = "OpArrow";

  static readonly OpParenthesisOpen = "OpParenthesisOpen";
  static readonly OpParenthesisClose = "OpParenthesisClose";
  static readonly OpCurlyBraceOpen = "OpCurlyBraceOpen";
  static readonly OpCurlyBraceClose = "OpCurlyBraceClose";

  static readonly If = "If";
  static readonly Else = "Else";
  static readonly EndIf = "EndIf";
  static readonly While = "While";
  static readonly EndWhile = "EndWhile";

  static readonly EoF = "EoF"; // Fin.

  // Pending:
  static readonly For = "For";
  static readonly EndFor = "EndFor";
  static readonly Each = "Each";
  static readonly In = "In";
  static readonly EndEach = "EndEach";

  static readonly Function = "Function";
  static readonly Return = "Return";
  static readonly EndFunction = "EndFunction";

  static readonly Class = "Class";
  static readonly EndClass = "EndClass";
  static readonly Static = "Static";
  static readonly Abstract = "Abstract";
  static readonly Private = "Private";
  static readonly Public = "Public";
  static readonly Protected = "Protected";
  static readonly Get = "Get";
  static readonly Set = "Set";
  static readonly Extends = "Extends";
  static readonly Interface = "Interface";
  static readonly EndInterface = "EndInterface";
  static readonly Implements = "Implements";
}

export class TokenTypes {
  static readonly Backtip = "Backtip"; // `
  static readonly Id = "Id";
  static readonly Space = "Space"; // " "

  static readonly ModVar = "ModVar";
  static readonly ModConst = "ModConst";

  static readonly TAny = "TAny";
  static readonly TBool = "TBool";
  static readonly TChar = "TChar";
  static readonly TInt = "TInt";
  static readonly TFloat = "TFloat";
  static readonly TDouble = "TDouble";
  static readonly TStr = "TStr";

  static readonly BoolConst = "BoolConst"; // true, false
  static readonly CharConst = "CharConst";
  static readonly IntConst = "IntConst"; // 1
  static readonly DecConst = "DecConst"; // 1.1
  static readonly StrConst = "StrConst";

  static readonly TextBlock = "TxtBlock";

  static readonly OpPlus = "OpPlus"; // "+"
  static readonly OpMinus = "OpMinus"; // "-"
  static readonly OpTimes = "OpTimes"; // "*"
  static readonly OpDiv = "OpDiv"; // "/"
  static readonly OpMod = "OpMod"; // %
  static readonly OpPow = "OpPow"; // ^, **
  static readonly OpSqrt = "OpSqrt"; // ¬/

  static readonly OpIncr = "OpIncr"; // ++
  static readonly OpDecr = "OpDecr"; // --

  static readonly OpNot = "Not";
  static readonly OpEq = "OpEq";
  static readonly OpLaxEq = "OpLaxEq";
  static readonly OpNEq = "OpNEQ";
  static readonly OpLaxNEq = "OpLaxNEQ";
  static readonly OpLT = "OpLT";
  static readonly OpGT = "OpGT";
  static readonly OpLTE = "OpLTE";
  static readonly OpGTE = "OpGTE";
  static readonly OpIn = "OpIn";
  static readonly OpExclRange = "OpExclRange";
  static readonly OpInclRange = "OpInclRange";

  static readonly OpAnd = "OpAnd";
  static readonly OpOr = "OpOr";

  static readonly OpAssign = "OpAssign";
  static readonly OpPlusAssign = "OpPlusAssign";
  static readonly OpMinusAssign = "OpMinusAssign";
  static readonly OpTimesAssign = "OpTimesAssign";
  static readonly OpDivAssign = "OpDivAssign";
  static readonly OpModAssign = "OpModAssign";
  static readonly OpPowAssign = "OpPowAssign";

  static readonly Dot = "Dot";
  static readonly BracketOpen = "BracketOpen";
  static readonly BracketClose = "BracketClose";
  static readonly Semi = "Semi"; // Semicolon
  static readonly Colon = "Colon";
  static readonly Quote = "Quote";
  static readonly Comma = "Comma";
  static readonly OpArrow = "OpArrow";
  static readonly EscSeq = "EscSeq";

  static readonly ParenOpen = "ParenOpen";
  static readonly ParenClose = "ParenClose";
  static readonly CurlyOpen = "CurlyOpen";
  static readonly CurlyClose = "CurlyClose";

  static readonly If = "If";
  static readonly Else = "Else";
  static readonly EndIf = "EndIf";
  static readonly While = "While";
  static readonly EndWhile = "EndWhile";

  static readonly EoF = "EoF"; // Fin.

  // Pending:
  static readonly For = "For";
  static readonly EndFor = "EndFor";
  // static readonly Each = "Each";
  // static readonly EndEach = "EndEach";

  static readonly Fn = "Fn";
  static readonly Return = "Return";
  static readonly EndFn = "EndFn";

  static readonly Enum = "Enum";
  static readonly EndEnum = "EndEnum";
  static readonly Class = "Class";
  static readonly Struct = "Struct";
  static readonly EndClass = "EndClass";
  static readonly Static = "Static";
  static readonly Abstract = "Abstract";
  static readonly Final = "Final";
  static readonly Virtual = "Virtual";
  static readonly Private = "Private";
  static readonly Public = "Public";
  static readonly Protected = "Protected";
  static readonly Get = "Get";
  static readonly Set = "Set";
  static readonly Extends = "Extends";
  static readonly Interface = "Interface";
  static readonly EndInterface = "EndInterface";
  static readonly Impl = "Impl";
}

export {TokenTypes as TT};

import Token from "../Token";
import {TT} from "../TokenTypes";


export const Operators = new Map<string, Token>();

Object.entries({
  [TT.OpIn]: ["in", "$in"],
  [TT.OpNot]: ["!", "not", "$not"],
  [TT.OpOr]: ["||", "or", "$or"],
  [TT.OpAnd]: ["&&", "and", "$and"],
  [TT.OpEq]: ["==", "eq", "$eq"],
  [TT.OpNEq]: ["!=", "ne", "$ne"],
  [TT.OpLaxEq]: ["~=", "leq", "$leq"],
  [TT.OpLaxNEq]: ["!~=", "lne", "$lne"],
  [TT.OpLT]: ["<", "lt", "$lt"],
  [TT.OpGT]: [">", "gt", "$gt"],
  [TT.OpLTE]: ["<=", "lte", "$lte"],
  [TT.OpGTE]: [">=", "gte", "$gte"],
  [TT.OpPow]: ["^", "**"],
  [TT.OpPowAssign]: ["^=", "**="],
  [TT.OpPlus]: ["+"],
  [TT.OpMinus]: ["-"],
  [TT.OpTimes]: ["*"],
  [TT.OpDiv]: ["/"],
  [TT.OpMod]: ["%"],
  [TT.OpSqrt]: ["¬/"],
  [TT.OpIncr]: ["++"],
  [TT.OpDecr]: ["--"],
  [TT.OpAssign]: ["="],
  [TT.OpPlusAssign]: ["+="],
  [TT.OpMinusAssign]: ["-="],
  [TT.OpTimesAssign]: ["*="],
  [TT.OpDivAssign]: ["/="],
  [TT.OpModAssign]: ["%="],
  [TT.ParenOpen]: ["("],
  [TT.ParenClose]: [")"],
  [TT.Dot]: ["."],
  [TT.OpInclRange]: [".."],
  [TT.OpExclRange]: ["..<"],
  [TT.BracketOpen]: ["["],
  [TT.BracketClose]: ["]"],
  [TT.CurlyOpen]: ["{"],
  [TT.CurlyClose]: ["}"],
  [TT.Semi]: [";"],
  [TT.Colon]: [":"],
  [TT.Comma]: [","],
  [TT.OpArrow]: ["->"],
  [TT.Backtip]: ["`"],
  [TT.Quote]: ['"'],
  [TT.EscSeq]: ["\\"],
  [TT.EndIf]: ["/if"],
  [TT.EndWhile]: ["/while"],
  [TT.EndFor]: ["/for"],
  [TT.EndFn]: ["/fn"],
  [TT.EndClass]: ["/class"],
  [TT.EndInterface]: ["/interface"],
}).forEach(([type, operators]) => {
  operators.forEach(o => Operators.set(o, new Token(type as TT, operators[0])));
});

export {Operators as OP};

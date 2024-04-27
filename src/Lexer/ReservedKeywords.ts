import {Token} from "../Token";
import {TT} from "../TokenTypes";



export const ReservedKeywords = new Map<string, Token>();

Object.entries({
  true: [TT.BoolConst, true],
  false: [TT.BoolConst, false],
  const: [TT.ModConst],
  var: [TT.ModVar],
  any: [TT.TAny],
  char: [TT.TChar],
  int: [TT.TInt],
  float: [TT.TFloat],
  double: [TT.TDouble],
  string: [TT.TStr],
  bool: [TT.TBool],
  if: [TT.If],
  else: [TT.Else],
  while: [TT.While],
  for: [TT.For],
  fn: [TT.Fn],
  return: [TT.Return],
  enum: [TT.Enum],
  class: [TT.Class],
  struct: [TT.Struct],
  get: [TT.Get],
  set: [TT.Set],
  static: [TT.Static],
  abstract: [TT.Abstract],
  final: [TT.Final],
  virtual: [TT.Virtual],
  private: [TT.Private],
  public: [TT.Public],
  protected: [TT.Protected],
  extends: [TT.Extends],
  interface: [TT.Interface],
  implements: [TT.Impl],
}).forEach(([type, keyword]) => {
  ReservedKeywords.set(type, new Token(
    keyword[0],
    keyword.length > 1 ? keyword[1] : type,
  ));
});

export {ReservedKeywords as RK};

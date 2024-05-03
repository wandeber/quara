// Two channel visitor result for AST interpreter.
export interface IVisitorResult<ValueType = number|boolean|string|object|Map<string, any>|any[]|undefined> {
  value: ValueType;
  output?: string;
  return?: boolean;
}

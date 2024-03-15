// Two channel visitor result for AST interpreter.
export interface IVisitorResult<ValueType = number|boolean|string|object|any[]|undefined> {
  value: ValueType;
  output?: string;
}

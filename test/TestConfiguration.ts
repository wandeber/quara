export class TestConfiguration {
  expression: string|string[];

  result: any;

  variables: object;

  shouldThrow = false;

  constructor(expression: string|string[], result?: any, variables: object = {}) {
    this.result = result;
    this.expression = expression;
    this.variables = variables;
  }

  toThrow() {
    this.shouldThrow = true;
    return this;
  }
}

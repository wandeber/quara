export default class TestConfiguration {
  expression: string|string[];

  result: any;

  variables: object;

  constructor(expression: string|string[], result: any, variables: object = {}) {
    this.result = result;
    this.expression = expression;
    this.variables = variables;
  }
}

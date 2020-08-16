export default class TestConfiguration {
  expression: string|string[];

  result: any;

  constructor(expression: string|string[], result: any) {
    this.result = result;
    this.expression = expression;
  }
}

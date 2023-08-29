const StartVariableNameRegExp = /^[a-z_$áéíóúñç]$/iu;
const VariableNameRegExp = /^[a-z0-9_$áéíóúñç]$/iu;

export default class Validation {
  static isValidStartVariableName(str: string) {
    return str.match(StartVariableNameRegExp);
  }

  static isValidVariableName(str: string) {
    return str.match(VariableNameRegExp);
  }
}

const StartVariableNameRegExp = /^[a-z_$áéíóúñç]$/i;
const VariableNameRegExp = /^[a-z0-9_$áéíóúñç]$/i;

export default class Validation {
  static isValidStartVariableName(str: string) {
    return str.match(StartVariableNameRegExp);
  }

  static isValidVariableName(str: string) {
    return str.match(VariableNameRegExp);
  }
}

const VariableNameRegExp = /^[a-z0-9_$áéíóúñç]+$/iu;

export default class Validation {
  static isValidVariableName(str: string) {
    return str.match(VariableNameRegExp);
  }
}

const VariableNameRegExp = /^[a-z0-9_$]+$/iu;

export default class Validation {
  static isValidVariableName(str: string) {
    return str.match(VariableNameRegExp);
  }
}

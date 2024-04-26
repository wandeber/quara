const StartVariableNameRegExp = /^[a-z_áéíóúñç]$/iu;
const VariableNameRegExp = /^[a-z0-9_áéíóúñç]$/iu;

export class Validation {
  static isValidStartVariableName(str: string) {
    return str.match(StartVariableNameRegExp);
  }

  static isValidVariableName(str: string) {
    return str.match(VariableNameRegExp);
  }
}

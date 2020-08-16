const AlphaRegExp = /^[a-z]+$/iu;
const AlphanumericRegExp = /^[a-z0-9]+$/iu;





export default class Types {
  static isInteger(str: string|number) {
    if (isNaN(str as number)) {
      return false;
    }
    let value = parseFloat(str as string); // parseFloat parses 1 to 1.0.
    return Number.isInteger(value); // isInteger returns true for cases like 1.0.
  }

  static isNumber(str: string|number) {
    return !isNaN(str as number);
  }

  static isAlpha(str: string) {
    return str.match(AlphaRegExp);
  }

  static isAlphanumeric(str: string) {
    return str.match(AlphanumericRegExp);
  }
}

const AlphaRegExp = /^[a-záéíóúñç]+$/iu;
const AlphanumericRegExp = /^[a-záéíóúñç0-9]+$/iu;





export class Types {
  static isInteger(str: string|number): boolean {
    if (isNaN(str as number)) {
      return false;
    }
    let value = parseFloat(str as string); // parseFloat parses 1 to 1.0.
    return !!Number.isInteger(value); // isInteger returns true for cases like 1.0.
  }

  static isNumber(value: string|number): boolean {
    if (typeof value === "number") {
      return !isNaN(value);
    }
    if (typeof value === "string" && value.trim() !== "") {
      return !isNaN(Number(value));
    }
    return false;
  }

  static isAlpha(str: string): boolean {
    return !!str.match(AlphaRegExp);
  }

  static isAlphanumeric(str: string): boolean {
    return !!str.match(AlphanumericRegExp);
  }
}

const quaraImport = require("@wandeber/quara");

const hasDefault = typeof quaraImport === "function";
const hasNamed = typeof quaraImport.Quara === "function";
const hasDefaultProp = typeof quaraImport.default === "function";

const success = hasDefault && hasNamed && hasDefaultProp;

/* eslint-disable no-console */
if (success) {
  console.log("[CJS] Quara import OK");
}
else {
  console.log("[CJS] Quara import FAILED");
}
/* eslint-enable no-console */

process.exit(success ? 0 : 1);

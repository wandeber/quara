import Quara, {Quara as NamedQuara} from "@wandeber/quara";

const success = typeof Quara === "function" && typeof NamedQuara === "function";

if (success) {
  console.log("[ESM] Quara import OK");
}
else {
  console.log("[ESM] Quara import FAILED");
}

process.exit(success ? 0 : 1);

import * as esbuild from "esbuild";

const buildBase = {
  platform: "node",
  minify: true,
  minifyIdentifiers: true,
  sourcemap: false,
  keepNames: false,
  minifyWhitespace: true,
  minifySyntax: true,
  treeShaking: true,
  banner: {
    js: "/*!\n"
      +" * Quara: Query as Sara.\n"
      +" * @licence ISC\n"
      +" * @author Bernardo A. Siverio (wandeber) <berthewanderer@gmail.com>\n"
      +" */",
  },
};

const quaraBuildBase = {
  ...buildBase,
  entryPoints: ["./src/Quara.ts"],
  bundle: true,
};

// Para CommonJS
esbuild.build({
  ...quaraBuildBase,
  outfile: "./dist/Quara.cjs.js",
  format: "cjs", // Formato CommonJS
}).catch(() => process.exit(1));

// Para ES6
esbuild.build({
  ...quaraBuildBase,
  outfile: "./dist/Quara.js",
  format: "esm", // Formato ES6
}).catch(() => process.exit(1));

// Shell
esbuild.build({
  ...buildBase,
  bundle: false,
  entryPoints: ["./src/shell.ts"],
  outfile: "./dist/Quara.shell.js",
}).catch(() => process.exit(1));
import fs from "fs";
import path from "path";
import * as esbuild from "esbuild";

/**
 * @type {esbuild.BuildOptions}
 */
const buildBase = {
  platform: "node",
  minify: true,
  minifyIdentifiers: true,
  sourcemap: true,
  keepNames: false,
  minifyWhitespace: true,
  minifySyntax: true,
  treeShaking: true,
  // metafile: true,
  banner: {
    js: "/*!\n"
      +" * Quara: Query as Sara.\n"
      +" * @licence CC BY-ND 4.0\n"
      +" * @author Bernardo Alemán Siverio (wandeber) <berthewanderer@gmail.com>\n"
      +" */",
  },
};

const quaraBuildBase = {
  ...buildBase,
  entryPoints: ["./src/Quara.ts"],
  bundle: true,
};


function writeMetafile(name, metafile) {
  const metafilePath = path.join("./dist", `${name}.meta.json`);
  fs.writeFileSync(metafilePath, JSON.stringify(metafile));
}

async function build(conf) {
  let result = await esbuild.build(conf).catch(() => process.exit(1));
  if (result.metafile) {
    console.log("Writing metafile");
    writeMetafile(
      conf.outfile.split("/").pop(), // Get the main file name
      result.metafile,
    );
  }
}

// Three separate builds
await Promise.all([
  {
    ...quaraBuildBase,
    outfile: "./dist/Quara.cjs",
    format: "cjs", // Formato CommonJS
  },
  {
    ...quaraBuildBase,
    outfile: "./dist/Quara.js",
    format: "esm", // Formato ES6
  },
  {
    ...buildBase,
    bundle: false,
    entryPoints: ["./src/shell.ts"],
    outfile: "./dist/Quara.shell.js",
  },
].map(build));

console.log("Build finished");

const fs = require("fs");
const path = require("path");

const sandbox = process.argv[2];

if (!sandbox) {
  console.error("Sandbox name required (cjs | esm).");
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");
const sandboxDir = path.resolve(rootDir, "sandbox/module-import", sandbox);

if (!fs.existsSync(sandboxDir)) {
  console.error(`Sandbox directory not found: ${sandboxDir}`);
  process.exit(1);
}

const distDir = path.resolve(rootDir, "dist");

if (!fs.existsSync(distDir)) {
  console.error("Build artifacts not found in dist/. Run npm run build first.");
  process.exit(1);
}

const packageJsonPath = path.resolve(rootDir, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const nodeModulesDir = path.join(sandboxDir, "node_modules");
fs.mkdirSync(nodeModulesDir, {recursive: true});
const packageTargetDir = path.join(nodeModulesDir, packageJson.name);

fs.rmSync(packageTargetDir, {recursive: true, force: true});
fs.mkdirSync(packageTargetDir, {recursive: true});

const entriesToCopy = Array.isArray(packageJson.files) ? packageJson.files : [];

const copyEntry = (entry) => {
  const source = path.resolve(rootDir, entry);
  if (!fs.existsSync(source)) {
    return;
  }

  const stats = fs.statSync(source);
  const destination = path.join(packageTargetDir, entry);
  fs.mkdirSync(path.dirname(destination), {recursive: true});

  if (stats.isDirectory()) {
    fs.cpSync(source, destination, {recursive: true});
  }
  else {
    fs.copyFileSync(source, destination);
  }
};

entriesToCopy.forEach(copyEntry);

const sandboxPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  type: packageJson.type,
  main: packageJson.main,
  module: packageJson.module,
  exports: packageJson.exports,
  license: packageJson.license,
};

if (packageJson.types) {
  sandboxPackageJson.types = packageJson.types;
}

if (packageJson.typesVersions) {
  sandboxPackageJson.typesVersions = packageJson.typesVersions;
}

fs.writeFileSync(
  path.join(packageTargetDir, "package.json"),
  `${JSON.stringify(sandboxPackageJson, null, 2)}\n`,
);

console.log(`Prepared sandbox '${sandbox}' with local build.`);

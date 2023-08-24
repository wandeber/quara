module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    // "prettier",
  ],
  extends: [
    // "plugin:prettier/recommended",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  rules: {
    // "prettier/prettier": "error",
    "max-len": ["error", {code: 120}],
    "no-multiple-empty-lines": ["error", {max: 5}],
    "operator-linebreak": ["error", "before"],
    "brace-style": ["error", "stroustrup", {allowSingleLine: true}],
    "space-before-function-paren": ["error", {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    }],
    "require-jsdoc": ["off"],
    "quote-props": ["error", "as-needed"],
    indent: ["error", 2, {MemberExpression: 0}],
    "arrow-parens": ["error", "as-needed"],
    "prefer-const": ["off"],
    quotes: ["error", "double", {avoidEscape: true}],
    "one-var": ["error", {initialized: "never", uninitialized: "always"}],
    "@typescript-eslint/no-explicit-any": "off",

  },
};

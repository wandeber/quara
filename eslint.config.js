import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "dist/**",
    ],
    files: [
      "src/**/*.ts",
      "scripts/**/*.ts",
      "test/**/*.ts",
    ],
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
  },
);

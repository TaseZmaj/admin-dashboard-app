import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactx from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      // ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactx.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-x": reactx,
      "react-dom": reactDom,
    },
    rules: {
      // Rules koj sakas da gi override-nesh tuka stojat
      //za ReactDom eslint i za Reactx eslint
      ...reactX.configs["recommended-typescript"].rules,
      ...reactDom.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);

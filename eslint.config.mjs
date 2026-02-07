import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";

const eslintConfig = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: eslintReact,
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-require-imports": "error",
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["src/app/**/*.{js,jsx,ts,tsx}", "src/components/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        FileReader: "readonly",
        Blob: "readonly",
        URL: "readonly",
        alert: "readonly",
        Image: "readonly",
      },
    },
  },
  {
    files: ["next.config.js", "postcss.config.js", "tailwind.config.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
      },
    },
  },
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;

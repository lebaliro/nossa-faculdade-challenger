import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "plugin:@next/next/recommended",
    ],
  }),
  ...tseslint.configs.recommended,
]);

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    // Project-specific ignores to avoid linting large built assets
    "dist/**",
    ".sanity/**",
    "public/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

import { type Config } from "prettier";

const config: Config = {
  arrowParens: "avoid",
  experimentalOperatorPosition: "start",
  experimentalTernaries: true,
  jsxSingleQuote: true,
  plugins: ["@prettier/plugin-xml"],
  printWidth: 60,
  singleQuote: true,
  trailingComma: "es5",
};

export default config;

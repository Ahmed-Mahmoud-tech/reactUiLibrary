import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import {dts} from "rollup-plugin-dts";
import postcss from 'postcss';
import babel from '@rollup/plugin-babel';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      // typescript({ tsconfig: "./tsconfig.json" }),
      postcss(), 
      dts(),
      babel({
        exclude: 'node_modules/**', // Only transpile our source code
        babelHelpers: 'bundled', // Use bundled helpers for smaller output
      }),
    ],
  },
  {
    input: "dist/esm/index.js",
    // output: [{ file: "dist/index.d.js", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
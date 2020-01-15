import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';

export default {
  plugins: [
    buble(),
    terser()
  ]
};

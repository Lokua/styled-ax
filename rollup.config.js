import buble from 'rollup-plugin-buble'
const pkg = require(`./package.json`)

export default {
  entry: `src/index.js`,
  dest: `dist/styled-ax.umd.min.js`,
  plugins: [buble()],
  format: `umd`,
  moduleName: `styledAx`
}

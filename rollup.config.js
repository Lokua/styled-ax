import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
const pkg = require(`./package.json`)

export default {
  entry: `src/index.js`,
  dest: `dist/styled-ax.umd.min.js`,
  plugins: [buble(), uglify()],
  format: `umd`,
  moduleName: `styledAx`
}

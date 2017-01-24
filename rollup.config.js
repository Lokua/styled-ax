import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

let dest = `dist/bundle.umd.js`
const plugins = [buble()]

if (process.env.NODE_ENV === `production`) {
  plugins.push(uglify())
  dest = `dist/bundle.umd.min.js`
}

export default {
  entry: `src/index.js`,
  dest,
  plugins,
  format: `umd`,
  moduleName: `styledAx`
}

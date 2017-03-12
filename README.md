# styled-ax

> styled-components theme accessor

## Overview

styled-ax (short for _accessor_) creates a theme property accessor for
[styled-components][0]. It supports easy access of top level and nested object keys
on a theme, as well as a simple interface for piping the accessed values
through a chain of functions.

## Usage

First you'll need to create a theme and pass it to styled-components [`ThemeProvider`][1]
as you normally would.

styled-ax supports the following theme structure:

```js
// theme.js
export default {
  // top level keys
  subtle: `floralwhite`,

  // and/or single level deep objects
  color: {
    subtle: `antiquewhite`
  }
}
```

Next, create your accessor, passing in your theme:

```js
import styledAx from 'styled-ax'
// or `const styledAx = require(`styled-ax`).default`
import theme from './theme'

const ax = styledAx(theme)
export default ax
```

Or if running in browser:
```html
<script src="./node_modules/styled-ax/dist/styled-ax.min.js"></script>
<script>
const theme = { /* ... */ }
const ax  = window.styledAx.default(theme)
</script>
```


Now, instead of default theme usage, where we
```js
color: ${props => props.theme.subtle};
```  

You can
```js
color: ${ax(`subtle`)};
```

Or if `subtle` is a property of a `color` object on your theme (like in the above example), you can
```js
const { color } = ax

const SubtleP = styled.p`
  color: ${color(`subtle`)};
`
```

> Note that `color` above is just an example - you can call your keys and nested
objects _whatever you want_

Asking for multiple values will return them joined:
```js
// theme = { a: `1px`, b: `2px` }
`margin: ${ax(`a`, `b`)};`
// => margin: 1px 2px;
```

... unless they are passed to a function, which will receive the values spread
```js
`margin: ${ax(`a`, `b`)(stripUnit)}em`
// stripUnit would be called as stripUnit(`1px`, `2px`)
```

which brings us to...

## Functions

Accessors can take an optional spread of functions to operate on accessed values.
The functions form a left to right pipeline, where the first function is passed a spread of the
accessed theme values in order, and the following operate on the result:

```js
color: ${color(`primary`, `secondary`)(mix(0.5), darken)};
```

The `mix` and `darken` functions in the example could be implemented with [`chroma-js`][2]
```js
import chroma from 'chroma-js'

export const darken = color => chroma(color).darken(1)

// if your function accepts parameters, use partial application
export const mix = amount => (color1, color2) => chroma.mix(color1, color2, amount)
```

## Tips

#### Export nested key accessors

At styled-ax creation time, you should export all the functions that reference
nested keys for greater readability:

```js
// my-ax.js
const theme = { color: {}, font: {}, size: {}, media: {} }

const ax = styledAx(theme)

export default ax
export const color = ax.color
export const font = ax.font
export const size = ax.size
export const media = ax.media
```

then you can
```js
import { color, media } from './my-ax'
```

#### Conditionals

An accessor accepts values and returns a function that expecting props, so if you
need some conditional based on props, you can pass them into ax manually

```js
`color: ${props => ax.color(props.active ? `active` : `default`)(props)};`
```

Even better, as that's pretty awkward, you can use styled-ax along with
`ifProp` from [styled-tools][3]!

```js
`color: ${ifProp(`active`, ax.color(`active`), ax.color(`default`))}`
```

## Install

```sh
yarn add styled-ax
```

```sh
npm i styled-ax
```

## License MIT

[0]: https://github.com/styled-components/styled-components
[1]: https://github.com/styled-components/styled-components/blob/master/docs/api.md#themeprovider
[2]: https://gka.github.io/chroma.js/
[3]: https://github.com/diegohaz/styled-tools

# styled-ax

> styled-components theme accessor


## Overview

styled-ax (short for _accessor_) creates a theme property accessor for
[styled-components][0]. It is lightweight and purposely generic. It supports easy
access of top level and nested object keys on a theme, as well as a simple
interface piping the accessed values through a chain of functions.

## Usage

styled-ax supports the following theme structure:

```js
export default {
  // top level key
  subtle: `floralwhite`,

  // and/or single level deep objects
  color: {
    subtle: `antiquewhite`
  }
}
```

Instead of default theme usage, where we
```js
color: ${props => props.theme.subtle};
```  

You can
```js
color: ${ax(`subtle`)};
```

Or if `subtle` is a property of a `color` object on your theme, you can
```js
const { color } = ax

export styled.div`
  color: ${color(`subtle`)};
`
```

> Note that `color` above is just an example - you can call your keys and nested
objects _whatever you want_ - ax don't care!

Accessors can take a spread of functions to operate on the accessed values
```js
color: ${color(`subtle`, `notSoSubtle`)(darken, blend(`20%`))};
```
> Note that `darken` and `blend` are just examples, they are not included in this
lib.

Asking for multiple values will return them joined
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

## Tips

These are necessarily restricted to use with styled-ax, but using themes with
styled-components in general.

There is no reason why you can't define entire rule sets in your theme:

```js
const color = `blue`
const background = `lightblue`

export default {
  contentMargin: `margin: 8px 6px 6px`,
  feature: `
    color: ${color},
    background: ${background},
    border: 1px solid ${blend(color, background)};
  `
}
```

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
Sure that's a PITA, but only has to be done once, and enables us to
```js
import { color, media } from './my-ax'
```

There is an awesome example of how to do media queries in the styled-components
[Tips and Tricks][1] doc; might as well define those in your theme for
easy accesss!

```js
export default {
  // ...color, font, size
  media: {

  }
}
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
[1]: https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md

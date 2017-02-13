# styled-ax

> styled-components theme accessor


## Overview

styled-ax (short for _accessor_) creates a theme property accessor for
[styled-components][0]. It is lightweight (435 B min+gzip) with zero dependencies
and purposely generic. It supports easy access of top level and nested object keys
on a theme, as well as a simple interface for piping the accessed values
through a chain of functions.

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
objects _whatever you want_

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

#### Custom functions

An accessor takes in names of variables and returns a function that is
expecting props from styled-components, or one or more functions. The function
signature is `(...input) => { /* anything */ }`. If you need configuration
arguments for your custom function, you can use partial application:

**Example**
```
const sum = (...args) => args.reduce((total, n) => total + n, 0)
// margin: ax(`a`, `b`)(sum)

const sumV2 = (...params) => (...args) => sum(...params.concat(args))
// margin: ax(`a`, `b`)(sumV2(99, 44)) /* a+b+99+44 */
```

Note that only the first function will receive the accessed theme values,
all subsequent functions are passed the output of the previous - they are
unary.

## Install

```sh
yarn add styled-ax
```

```sh
npm i styled-ax
```

## License MIT

[0]: https://github.com/styled-components/styled-components

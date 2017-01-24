# styled-ax

> styled-components theme accessor


## Overview

styled-ax (short for _accessor_) creates a theme property accessor for
[styled-components][0]. It is lightweight and purposely generic. It supports easy
access of top level and nested object keys on a theme, as well as a simple
interface piping the accessed values through a chain of functions.

## Usage

styled-ax supports the following theme structure:

```
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
```
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


## Install

```sh
yarn add styled-ax
```

```sh
npm i styled-ax
```

## License MIT

[0]: https://github.com/styled-components/styled-components
[1]: https://github.com/erikras/styled-components-theme

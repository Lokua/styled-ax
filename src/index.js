export default theme => Object.assign(
  createAccessor(createValuesAccessor()),
  createUserAccessors(theme)
)

function createAccessor(applyKeys) {
  return (...args) => (...b) => typeof b[0] === `function` ?
    props => {
      let fns = b.slice()
      let fn = fns.shift()
      let val = fn(...applyKeys(...args)(props))
      while (fn = fns.shift()) val = fn(val)
      return val
    } :
    applyKeys(...args)(b[0]).join(` `)
}

function createUserAccessors(theme) {
  return Object.keys(theme).reduce((o, key) => {
    if (typeof theme[key] === `object`)
      o[key] = createAccessor(createValuesAccessor(key))
    return o
  }, {})
}

function createValuesAccessor(key) {
  return (...keys) => props => {
    const vars = key ? props.theme[key] : props.theme
    return values(plucks(...keys)(vars))
  }
}

function values(obj) {
  return Object.keys(obj).map(k => obj[k])
}

function plucks(...keys) {
  return object => keys.reduce((obj, key) => {
    obj[key] = object[key]
    return obj
  }, {})
}

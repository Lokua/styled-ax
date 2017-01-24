import create from './index'

describe(`create`, () => {
  it(`should return a function`, () => {
    expect(typeof create({})).toEqual(`function`)
  })

  it(`should return a function with no ownProps`, () => {
    expect(Object.keys(create({}))).toEqual([])
  })

  it(`should contain ownProps of user keys only for nested objects`, () => {
    expect(Object.keys(create({
      a: 42,
      b: {}
    }))).toEqual([`b`])
  })
})

describe(`ax`, () => {
  const props = {
    theme: {
      a: 1,
      b: 2,
      c: 3,
      o: {
        x: 4,
        y: 5,
        z: 6
      }
    }
  }

  const ax = create(props.theme)
  const { o } = ax
  const func = jest.fn()

  it(`should return values for top level theme keys`, () => {
    expect(ax(`a`)(props)).toEqual(`1`)
    expect(ax(`b`)(props)).toEqual(`2`)
    expect(ax(`c`)(props)).toEqual(`3`)
  })
  it(`should return values for top level theme keys (nested)`, () => {
    expect(o(`x`)(props)).toEqual(`4`)
    expect(o(`y`)(props)).toEqual(`5`)
    expect(o(`z`)(props)).toEqual(`6`)
  })

  it(`should concat multi values joined by space`, () => {
    expect(ax(`a`, `b`, `c`)(props)).toEqual(`1 2 3`)
  })
  it(`should concat multi values joined by space (nested)`, () => {
    expect(o(`x`, `y`, `z`)(props)).toEqual(`4 5 6`)
  })

  it(`should spread accessed values to user func`, () => {
    ax(`a`, `c`)(func)(props)
    expect(func).toHaveBeenLastCalledWith(1, 3)
  })
  it(`should spread accessed values to user func (nested)`, () => {
    ax.o(`x`, `z`)(func)(props)
    expect(func).toHaveBeenLastCalledWith(4, 6)
  })
})

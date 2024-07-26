import { getEachChildPaths } from './each'

describe('path mapping', () => {
  it('converts a string array', () => {
    const result = getEachChildPaths(['a', 'b', 'c'])
    expect(result).toBe('{{{this}}}')
  })
  it('converts an object', () => {
    const result = getEachChildPaths({ a: 'a1', b: 'b1' })
    expect(result).toHaveProperty('a')
    expect(result).toHaveProperty('b')
  })

  it('converts an array of object', () => {
    const result = getEachChildPaths([
      { a: 'a1', b: 'b1' },
      { a: 'a2', b: 'b2' },
    ])
    expect(result).toHaveProperty('a')
    expect(result).toHaveProperty('b')
  })
})

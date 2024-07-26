import { getPlaceholderPaths } from './get-placeholder-paths'

it('should not mutate the original object', () => {
  const obj = { foo: 1, bar: '2' }
  getPlaceholderPaths(obj)

  expect(Object.keys(obj)).toHaveLength(2)
  expect(obj.foo).toBe(1)
  expect(obj.bar).toBe('2')
})

it('should map a non-nested object', () => {
  const obj = { foo: 1, bar: '2' }
  const paths = getPlaceholderPaths(obj)

  expect(Object.keys(obj)).toHaveLength(2)
  expect(paths.foo).toBe('$$foo')
  expect(paths.bar).toBe('$$bar')
})

it('should map a nested object', () => {
  const obj = { foo: 1, one: { two: { three: { four: 4 }, sixNine: 69 } } }
  const paths = getPlaceholderPaths(obj)

  expect(Object.keys(obj)).toHaveLength(2)
  expect(paths.foo).toBe('$$foo')
  expect(paths.one.two.three.four).toBe('$$one.two.three.four')
  expect(paths.one.two.sixNine).toBe('$$one.two.sixNine')
})

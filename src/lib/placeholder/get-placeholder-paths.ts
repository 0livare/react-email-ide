import deepClone from 'lodash/cloneDeep'
import { PlaceholderPaths, ValidPath } from './types'

/**
 * The object returned this function is intended to be used with the
 * `<Placeholder />` component.
 *
 * It takes in a sample data object, and returns an object with an identical
 * structure to that sample data object, except that every value is replaced
 * with a string that describes the hierarchical path it took to get to that value.
 *
 * For example, `getPlaceholderPaths({foo: {bar: {baz: 4}}})` will return
 * `{foo: {bar: {baz: 'foo.bar.baz'}}}`.
 *
 * This is useful because it allows allows you to pass a strongly typed
 * object to `<Placeholder />`, meaning that typescript will tell you if
 * your sample data does not match the path you're using to access it.  But
 * the intention of `<Placeholder />` is to generate a handlebars template,
 * which of course must be the path to a value, not the value itself.
 */
export function getPlaceholderPaths<T extends Record<string, any>>(sampleData: T) {
  if (typeof sampleData !== 'object') return sampleData

  const copy = deepClone(sampleData)
  recursiveGetPaths(copy)
  return copy as unknown as PlaceholderPaths<T>
}

export function recursiveGetPaths(sampleData: any, prefix = '') {
  if (typeof sampleData !== 'object') return

  for (let key in sampleData) {
    const nextLevelKey = prefix ? prefix + '.' + key : key

    if (sampleData[key] != null && typeof sampleData[key] === 'object') {
      sampleData[key].toString = () => '$$' + nextLevelKey
      recursiveGetPaths(sampleData[key], nextLevelKey)
    } else if (typeof sampleData[key] === 'function') {
      // This is the toString() fn we set above
      continue
    } else {
      // The '$$' makes it easy to determine at runtime if an object
      // was run through this function or not.
      sampleData[key] = '$$' + nextLevelKey
    }
  }
}

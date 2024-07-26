type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName }

/**
 * A path that is valid for a placeholder. It must be able to produce
 * an output value, so it must be a primitive.
 *
 * This type intentionally does not _exactly_ mirror reality. At runtime,
 * a valid path is a string that is prefixed with two dollar signs, but
 * this type is created to be distinct from a string so that a string
 * cannot be passed in place of a valid path. The only way to create
 * a valid path is to call the `getPlaceholderPaths` function.
 */
export type ValidPath = Distinct<string, '$$ValidPath'>

/**
 * A path that is valid for a boolean "if check". It either exists or
 * it doesn't, it doesn't need to be able to produce an output value
 * like a `ValidPath` does.
 */
export type ValidIfPath =
  | ValidPath
  | ValidPath[]
  | Record<any, ValidPath>
  | Record<any, ValidPath>[]

export type PlaceholderPaths<T> = T extends object
  ? { [K in keyof T]: PlaceholderPaths<T[K]> }
  : ValidPath

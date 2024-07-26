export type Nullable<T> = T | null | undefined

/**
 * Simplify the TS "hover preview" for some of our custom types
 * e.g. `Prettify<{a: string} & {b: string} & {c?: string}>` becomes `{a: string; b: string; c?: string}`
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

/** Convert a union (OR) type, to an intersection (AND) type. */
export type UnionToIntersection<U> = Prettify<_UnionToIntersection<U>>
type _UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

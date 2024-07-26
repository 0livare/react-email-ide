import { ReactNode } from 'react'

import { Mj } from '~/components'
import { parsePlaceholderPath } from './parse-placeholder-path'
import { ValidPath } from './types'

type EachPropsArray<T extends any[]> = {
  path: T
  children: (item: T[0], helpers: typeof eachHelpers) => ReactNode
}

type EachPropsObject = {
  path: any
  children: (item: string, helpers: typeof eachHelpers) => ReactNode
}

export type EachProps<T> = T extends any[] ? EachPropsArray<T> : EachPropsObject

// See: https://handlebarsjs.com/guide/builtin-helpers.html#each
const eachHelpers = {
  index: '{{@index}}',
  key: '{{@key}}',
}

export function Each<T>(props: EachProps<T>) {
  const { children, path } = props

  return (
    <>
      <Mj.Raw> {`{{#each ${parsePlaceholderPath(path as ValidPath, 'Each')}}}`}</Mj.Raw>
      {children(getEachChildPaths(path as ValidPath), eachHelpers)}
      <Mj.Raw>{`{{/each}}`}</Mj.Raw>
    </>
  )
}

/**
 * We want the render prop of <Each> to be strongly typed to the shape
 * of the sample data. But the content that actually gets rendered
 * into HTML has to follow the handlebars _this_ syntax.  This function
 * converts the paths object (returned from get-placeholder-paths) to
 * a shape suitable to be used as the #each child.
 *
 * Note: It is unintuitive, but this function will never return an array,
 * even if it is passed an array. This is because no actual iteration
 * happens on this data.  The iteration is contained inside of the
 * handlebars engine. So instead of using an array, `{{{this}}}`  is used
 * to reference the current element.
 *
 * See: See: https://handlebarsjs.com/guide/builtin-helpers.html#each
 *
 * e.g.
 * ```
 * ["a", "b"]             => "{{{this}}}"
 * {a: 'a', b: 'b'}       => { a: "{{{this.a}}}", b: "{{{this.b}}}" }
 * [{a: 'a1'}, {a: 'a2'}] => { a: "{{{this.a}}}" }
 * ```
 */
export function getEachChildPaths(path: ValidPath): any {
  // Non-array means either string or root object.  A root object
  // indicates that the intent is to iterate over the object, rather
  // than over an array.
  // If the intent was _not_ iteration over the object, this <Each>
  // component would not be necessary in the first place.
  return Array.isArray(path) ? recursiveGetEachChildPaths(path) : '{{{this}}}'
}

function recursiveGetEachChildPaths(path: ValidPath): any {
  if (path == null) return null

  if (typeof path === 'string') {
    return '{{{this}}}'
  }

  if (Array.isArray(path)) {
    return recursiveGetEachChildPaths(path[0])
  }

  if (typeof path === 'object') {
    return Object.keys(path).reduce((accum, key) => {
      if (key !== 'toString') accum[key] = `{{{this.${key}}}}`
      return accum
    }, {} as any)
  }

  return null
}

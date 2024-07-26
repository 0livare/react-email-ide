import { ReactNode } from 'react'

import { Mj } from '~/components'
import { parsePlaceholderPath } from './parse-placeholder-path'
import { ValidIfPath } from './types'
import { Nullable } from '../types'

export type IfProps = {
  children: ReactNode
  /** The path to use for the condition */
  path: ValidIfPath | undefined
  /**
   * For when you need to support a value as well as a path.
   * This prop completely changes the way this component works.
   * If `ignorePathIfTrue` is true, the `path` prop is ignored and
   * the children are rendered.
   */
  ignorePathIfTrue?: boolean
  /**
   * Invert the if.  Uses Handlebars "unless" helper.
   * If `and` or `or` is also used, the not will be applied
   * last; i.e. `!(a && b)`, `!(a || b)`
   */
  not?: boolean
  /** Turn the if into a two part AND conditional with `path` */
  and?: ValidIfPath
  /** Turn the if into a two part OR conditional with `path` */
  or?: ValidIfPath
}

export function If(props: IfProps) {
  const { children, path, not, and, or, ignorePathIfTrue } = props

  if (ignorePathIfTrue === true) return <>{children}</>
  if (path === undefined) return null

  const helperName = not ? 'unless' : 'if'
  let _path = parseIfPath(path, { and, or, componentName: 'If' })

  return (
    <>
      <Mj.Raw>{`{{#${helperName} ${_path}}}`}</Mj.Raw>
      {children}
      <Mj.Raw>{`{{/${helperName}}}`}</Mj.Raw>
    </>
  )
}

export function parseIfPath(
  path: Nullable<ValidIfPath>,
  args: { and?: ValidIfPath; or?: ValidIfPath; componentName: string },
) {
  const { and, or, componentName } = args

  if (and && or) {
    throw new Error(`You may not pass both AND & OR to <${componentName}>`)
  }

  let _path = path ? parsePlaceholderPath(path, 'If') : 'unknown'
  if (and) {
    _path = `(and ${_path} ${parsePlaceholderPath(and, componentName)})`
  } else if (or) {
    _path = `(or ${_path} ${parsePlaceholderPath(or, componentName)})`
  }

  return _path
}

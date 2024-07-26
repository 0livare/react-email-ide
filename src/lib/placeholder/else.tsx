import { ReactNode } from 'react'

import { Mj } from '~/components'
import { ValidPath } from './types'
import { IfProps, parseIfPath } from './if'

export type ElseProps = Omit<IfProps, 'path' | 'children'> & {
  children?: ReactNode
  if?: ValidPath
}

export function Else(props: ElseProps) {
  const { children, if: _if, and, or } = props

  const helperName = _if ? 'else if' : 'else'
  const path = parseIfPath(_if, { and, or, componentName: 'Else' })

  return (
    <>
      <Mj.Raw>{`{{${helperName} ${path}}}`}</Mj.Raw>
      {children}
    </>
  )
}

import React from 'react'

import { Mj } from './mj'
import { Nullable } from '~/lib'

export const SKINNY_COL_WIDTH = 458

export type SectionWithColProps = React.ComponentProps<typeof Mj.Section> & {
  colProps?: React.ComponentProps<typeof Mj.Column>
  skinny?: boolean
  width?: Nullable<number | string>
}

/**
 * An `<MjmlSection>` that contains a single `<MjmlColumn>` and class
 * `sky-section` added to the root so that it can easily be targeted
 * with CSS selectors.
 */
export function SectionWithCol(props: SectionWithColProps) {
  const { children, colProps, skinny, width, ...rest } = props
  return (
    <Mj.Section {...rest}>
      <Mj.Column width={width ?? (skinny ? SKINNY_COL_WIDTH : undefined)} {...colProps}>
        {children}
      </Mj.Column>
    </Mj.Section>
  )
}

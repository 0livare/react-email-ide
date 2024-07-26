import React from 'react'
import { colors } from './colors'

import { Mj } from './mj'
import { BodyText } from './body-text'

export type BlockquoteProps = React.ComponentProps<typeof Mj.SectionWithCol>

export function Blockquote(props: BlockquoteProps) {
  const { children, colProps, skinny, width, ...rest } = props

  return (
    <Mj.SectionWithCol
      {...rest}
      colProps={{
        ...colProps,
        borderLeft: `1px solid ${colors.gray[600]}`,
      }}
      paddingLeft={skinny ? 48 : 24}
      width={width}
      skinny={skinny}
    >
      <BodyText color={colors.gray[600]} padding={0} paddingLeft={16} fontStyle="italic">
        "{children}"
      </BodyText>
    </Mj.SectionWithCol>
  )
}

import type { ComponentProps } from 'react'
import { colors } from './colors'
import { Mj } from './mj'

export type BodyTextProps = ComponentProps<typeof Mj.Text>

export function BodyText(props: BodyTextProps) {
  return (
    <Mj.Text
      fontSize={16}
      lineHeight="1.5"
      fontWeight={400}
      fontFamily="Helvetica"
      color={colors.night[800]}
      {...props}
    />
  )
}

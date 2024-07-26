import { ComponentProps } from 'react'
import { colors } from './colors'

import { Mj } from './mj'

export type ButtonProps = ComponentProps<typeof Mj.Button>

export function Button(props: ButtonProps) {
  return (
    <Mj.Button
      paddingTop={6.5}
      paddingBottom={9.4}
      paddingLeft={24}
      paddingRight={24}
      backgroundColor={colors.night[800]}
      borderRadius={20}
      fontFamily="Helvetica"
      fontWeight={700}
      fontSize={16}
      lineHeight="1.5"
      {...props}
    />
  )
}

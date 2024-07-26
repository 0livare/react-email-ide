import { ReactNode } from 'react'
import { colors } from '../colors'

import { Mj } from '../mj'

type H1Props = { children: ReactNode; wide?: boolean; width?: number }

export function H1(props: H1Props) {
  const { children, width, wide = true } = props
  const sectionWidth = width ? width : wide ? 490 : 380

  return (
    <Mj.SectionWithCol
      fullWidth
      paddingTop={0}
      paddingBottom={0}
      colProps={{ width: sectionWidth }}
    >
      <Mj.Text
        align="center"
        fontSize={32}
        fontFamily="Helvetica"
        fontWeight={700}
        lineHeight="1.16"
        letterSpacing="-0.28px"
        color={colors.night[900]}
      >
        {children}
      </Mj.Text>
    </Mj.SectionWithCol>
  )
}

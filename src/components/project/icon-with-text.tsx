import { ComponentProps, ReactNode } from 'react'

import { Mj } from '../mj'
import { BodyText } from '../body-text'

export type IconWithTextProps = ComponentProps<typeof Mj.Section> & {
  children: ReactNode
  src: string
}

export function IconWithText(props: IconWithTextProps) {
  const { children, src, ...rest } = props

  return (
    <Mj.Section padding={0} {...rest}>
      <Mj.Column width={40}>
        <Mj.Image padding={0} paddingTop={12} src={src} />
      </Mj.Column>
      <Mj.Column>
        <BodyText paddingLeft={16} paddingRight={0}>
          {children}
        </BodyText>
      </Mj.Column>
    </Mj.Section>
  )
}

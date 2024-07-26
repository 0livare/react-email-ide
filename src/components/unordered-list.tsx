import { ReactNode } from 'react'
import { BodyText, BodyTextProps } from './body-text'

type UnorderedListProps = BodyTextProps & {
  children: ReactNode
}

export function UnorderedList(props: UnorderedListProps) {
  const { children, ...rest } = props

  return (
    <BodyText {...rest} paddingTop={0} paddingBottom={0}>
      <ul>{children}</ul>
    </BodyText>
  )
}

import { ComponentProps } from 'react'

export type LinkProps = ComponentProps<'a'> & {
  newTab?: boolean
}

/** Anchor that defaults to opening in a new tab */
export function Link(props: LinkProps) {
  const { children, newTab = true } = props
  return (
    <a
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      {...props}
    >
      <b>{children}</b>
    </a>
  )
}

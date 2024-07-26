import { Placeholder, ValidPath, type Nullable } from '~/lib'

type NamePlaceholderProps = {
  path: Nullable<{
    firstName: ValidPath
    lastName: ValidPath
  }>
}

export function NamePlaceholder({ path }: NamePlaceholderProps) {
  if (!path) return null
  return (
    <>
      <Placeholder path={path.firstName} /> <Placeholder path={path.lastName} />
    </>
  )
}

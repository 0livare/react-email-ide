import { Mj } from '~/components'
import { PathOptions, pathToValue } from './parse-placeholder-path'
import { ValidPath } from './types'

export type PlaceholderProps = PathOptions & {
  path: ValidPath
}

export function Placeholder(props: PlaceholderProps) {
  const { path, escape } = props
  return <Mj.Raw>{pathToValue(path, { escape })}</Mj.Raw>
}

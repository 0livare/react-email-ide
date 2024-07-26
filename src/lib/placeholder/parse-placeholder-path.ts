import type { ValidIfPath, ValidPath } from './types'

/**
 * Validate the path was run through `getPlaceholderPaths()`, and then
 * parse out the inner path to be used in a handlebars template.
 */
export function parsePlaceholderPath(path: ValidIfPath, componentName = 'Placeholder') {
  if (path == null) {
    throw new Error(
      [
        `The path you passed to <${componentName}> does not`,
        `exist in your sample data. To test a conditional`,
        `render, set the value to null rather than deleting`,
        `it.`,
      ].join(' '),
    )
  }

  const strPath = path.toString()

  if (!strPath.startsWith('$$')) {
    throw new Error(
      [
        `Do not pass your sample data object directly to`,
        `<${componentName}>. You must first run it through`,
        `getPlaceholderPaths().`,
      ].join(' '),
    )
  }

  return strPath.substring(2)
}

export type PathOptions = {
  /**
   * Passing false here will use a "triple-stash" (i.e. `{{{foo}}}`)
   * to prevent Handlebars from escaping the value. Doing so lets
   * you do something like pass HTML (e.g. `<strong>`, or `<br>`) or
   * quote or ampersand characters.
   * @default true
   */
  escape?: boolean
}

/**
 * Convert a path to that path's value.  Similar to <Placeholder> except
 * it works purely as a string, instead of creating a React component.
 */
export function pathToValue(path: ValidPath, options: PathOptions = {}) {
  const { escape = true } = options
  const open = escape ? '{{' : '{{{'
  const close = escape ? '}}' : '}}}'

  return open + parsePlaceholderPath(path) + close
}

/** Useful when you need to default a path field to something */
export function getFalsyValidPath(): ValidPath {
  return '$$null' as ValidPath
}

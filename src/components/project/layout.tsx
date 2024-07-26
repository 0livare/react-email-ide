import {
  getFalsyValidPath,
  If,
  pathToValue,
  Placeholder,
  UnionToIntersection,
  ValidPath,
} from '~/lib'
import { Mj } from '../mj'
import { H1 } from './h1'
import { Logo } from './logo'
import { Button } from '../button'
import { colors } from '../colors'

type TitleProp = { titlePath: ValidPath } | { title: any }
type BelowTitleButtonProps =
  | { belowTitleButtonHref: string; belowTitleButtonText: string }
  | { belowTitleButtonHrefPath: ValidPath; belowTitleButtonTextPath: ValidPath }
  | {}

export type LayoutProps = {
  children: any
  wideTitle?: boolean
  width?: number
  titleDivider?: boolean
} & TitleProp &
  BelowTitleButtonProps

export function Layout(props: LayoutProps) {
  const {
    children,
    titlePath,
    title,
    wideTitle,
    width,
    titleDivider = true,
    belowTitleButtonHref,
    belowTitleButtonText,
    belowTitleButtonHrefPath = getFalsyValidPath(),
    belowTitleButtonTextPath = getFalsyValidPath(),
  } = props as UnionToIntersection<LayoutProps>

  return (
    <>
      <Logo />

      <Mj.Wrapper paddingLeft={20} paddingRight={20} paddingTop={28} backgroundColor="white">
        <H1 wide={wideTitle} width={width}>
          {title ?? <Placeholder path={titlePath} escape={false} />}
        </H1>

        <If path={belowTitleButtonTextPath} ignorePathIfTrue={!!belowTitleButtonText}>
          <Mj.SectionWithCol skinny padding={0}>
            <Button
              href={belowTitleButtonHref || pathToValue(belowTitleButtonHrefPath)}
              align="center"
              paddingTop={16}
            >
              {belowTitleButtonText || <Placeholder path={belowTitleButtonTextPath} />}
            </Button>
          </Mj.SectionWithCol>
        </If>

        {titleDivider && (
          <Mj.SectionWithCol skinny paddingTop={0} paddingBottom={4}>
            <Mj.Divider
              borderWidth={1}
              borderColor={colors.night[400]}
              paddingTop={28}
              paddingBottom={0}
            />
          </Mj.SectionWithCol>
        )}

        {children}
      </Mj.Wrapper>
    </>
  )
}

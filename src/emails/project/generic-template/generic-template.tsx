import { Mj, BodyText, Button, colors } from '~/components'
import { Layout } from '~/components/project'
import { Placeholder, getPlaceholderPaths, Each, If, pathToValue } from '~/lib'
import sampleData from './generic-template.data'

export function Project_GenericTemplate() {
  const paths = getPlaceholderPaths(sampleData)

  return (
    <Mj.ml>
      <Mj.Body backgroundColor={colors.night[100]} width={768}>
        <Layout
          titlePath={paths.header.text}
          belowTitleButtonHrefPath={paths.header.button.url}
          belowTitleButtonTextPath={paths.header.button.text}
        >
          <Mj.SectionWithCol skinny>
            <If path={paths.salutation}>
              <If path={paths.addressedTo.firstName}>
                <BodyText>
                  Hi <Placeholder path={paths.addressedTo.firstName} />,
                </BodyText>
              </If>
            </If>
            <Each path={paths.body}>{(paragraph) => <BodyText>{paragraph}</BodyText>}</Each>
          </Mj.SectionWithCol>

          <If path={paths.button.text}>
            <Mj.SectionWithCol skinny padding={0}>
              <Button href={pathToValue(paths.button.url)} align="left">
                <Placeholder path={paths.button.text} />
              </Button>
            </Mj.SectionWithCol>
          </If>
        </Layout>
      </Mj.Body>
    </Mj.ml>
  )
}

---
to: src/emails/<%=project%>/<%=componentName%>/<%=componentName%>.tsx
---
<%
  let pascalProject = h.changeCase.pascalCase(project) 
  let pascalComponentName = h.changeCase.pascalCase(componentName) 
-%>
import { Placeholder, getPlaceholderPaths } from '~/lib'
import { Mj, Button, colors } from '~/components'
import sampleData from './<%=componentName%>.data'


export function <%= pascalProject %>_<%= pascalComponentName %>() {
  const paths = getPlaceholderPaths(sampleData)

  return (
    <Mj.ml>
      <Mj.Head>
        <Mj.Title>Last Minute Offer</Mj.Title>
        <Mj.Preview>Last Minute Offer...</Mj.Preview>
      </Mj.Head>
      <Mj.Body>
        <Mj.Section fullWidth backgroundColor={colors.gray[300]}>
          <Mj.Column width={300}>
            <Mj.Image src="https://picsum.photos/200/300" />
          </Mj.Column>
          <Mj.Column>
            <Button href="https://www.google.com">
              <Placeholder path={paths.button.text} />
            </Button>
          </Mj.Column>
        </Mj.Section>
      </Mj.Body>
    </Mj.ml>
  )
}

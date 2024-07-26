---
to: src/components/<%=componentName%>.tsx
---
<%
  let pascalComponentName = h.changeCase.pascalCase(componentName) 
-%>
import { Mj } from './mj'

type <%= pascalComponentName %>Props = {}

export function <%= pascalComponentName %>(props: <%= pascalComponentName %>Props) {
  return (
    <>
      <Mj.Button padding="20px" backgroundColor="#346DB7" href="https://www.wix.com/">
        Click Me!
      </Mj.Button>
      <Mj.Text>Hello world!</Mj.Text>
    </>
  );
}




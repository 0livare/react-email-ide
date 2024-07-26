---
to: src/emails/<%=project%>/<%=componentName%>/<%=componentName%>.data.ts
---
<%
  let pascalProject = h.changeCase.pascalCase(project) 
  let pascalComponentName = h.changeCase.pascalCase(componentName) 
-%>
export const <%=pascalProject%>_<%=pascalComponentName%>_SampleData = {
  button: {
    text: 'This button is responsive on narrow screens',
  },
}

export default <%=pascalProject%>_<%=pascalComponentName%>_SampleData


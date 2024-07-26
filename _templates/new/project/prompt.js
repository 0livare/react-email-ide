// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'project',
    message: "What's the name of this new project (in-kebab-case)?",
  },
  {
    type: 'input',
    name: 'componentName',
    message: "What's the name of the first email (in-kebab-case)? e.g. test-email",
    result(componentName) {
      return componentName || 'TestEmail'
    },
  },
]

// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const path = require('path')
const fs = require('fs')

const ROOT = path.join(__dirname, '..', '..', '..')
const SRC = path.join(ROOT, 'src')

module.exports = [
  {
    type: 'select',
    name: 'project',
    message: 'Which project should this email be added to?',
    choices() {
      let { folder } = this.enquirer.answers
      let folderPath = path.join(SRC, 'emails')
      return fs.readdirSync(folderPath).filter((fileName) => !fileName.includes('.'))
    },
  },
  {
    type: 'input',
    name: 'componentName',
    message: "What's the name of this email (in-kebab-case)? e.g. test-email",
    result(componentName) {
      return componentName || 'TestEmail'
    },
  },
]

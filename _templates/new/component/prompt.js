// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const path = require('path')
const fs = require('fs')

const ROOT = path.join(__dirname, '..', '..', '..')
const SRC = path.join(ROOT, 'src')

module.exports = [
  {
    type: 'input',
    name: 'componentName',
    message: "What's the name of this email component (in-kebab-case)?",
  },
]

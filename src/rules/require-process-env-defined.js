/* eslint-disable no-console */

import fs from 'fs'
import findUp from 'find-up'

const getAppsjson = context => {
  const path = findUp.sync('app.json', { cwd: context })

  if (!path) {
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (error) {
    console.log(`Could not parse app.json at ${path}.`)
    return null
  }
}

export default context => {
  const whitelist = context.options[0] || []
  const appjson = getAppsjson(context.getFilename())

  if (!appjson || !appjson.env) {
    return false
  }

  return {
    MemberExpression(node) {
      const objectName = node.object.name
      const propertyName = node.property.name
      const isProcessEnv = !node.computed && objectName === 'process' && propertyName === 'env'

      if (isProcessEnv) {
        const keyNode = node.parent.property
        const key = keyNode.name || keyNode.value
        const nodeBefore = context.getTokenBefore(keyNode)

        /* Ignores process.env[key] but applies to process.env['value'] */
        if (keyNode.type === 'Identifier' && nodeBefore.value !== '.') {
          return
        }

        if (!appjson.env[key] && whitelist.indexOf(key) === -1) {
          context.report(keyNode, `${key} is not declared in your app.json file`)
        }
      }
    },
  }
}

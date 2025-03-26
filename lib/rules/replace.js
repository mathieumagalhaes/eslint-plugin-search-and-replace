const parseOptions = (optionsDTO) => {
  let { search, replace, caseSensitive, scope } = optionsDTO
  if (typeof caseSensitive === 'undefined') caseSensitive = true
  if (typeof scope === 'undefined') scope = 'global'

  const searchRegex = new RegExp(search, caseSensitive ? 'g' : 'gi')
  return {
    regex: searchRegex,
    replace,
    scope,
  }
}

const handleRule = (optionsDTO, callback) => {
  if (!Array.isArray(optionsDTO) && typeof optionsDTO !== 'object') return
  if (Array.isArray(optionsDTO)) {
    optionsDTO.forEach(option => callback(parseOptions(option)))
  } else {
    return (parseOptions(optionsDTO))
  }
}

const handleCodeAction = (text, regex, replace, context, node) => {
  if (regex.test(text)) {
    context.report({
      node,
      messageId: 'replace',
      fix: fixer => {
        const newText = text.replace(regex, replace)
        return fixer.replaceText(node, newText)
      },
    })
  }
}

module.exports = {
  meta: {
    fixable: 'code',
    type: 'suggestion',
    docs: {
      description: 'Replace text with another text',
    },
    messages: {
      replace: 'Replace text with another text',
    },
    schema: [{
      type: 'object',
      properties: {
        search: { type: 'string' },
        replace: { type: 'string' },
        caseSensitive: { type: 'boolean', default: true },
        scope: { type: 'string', default: 'global' },
      },
    }],
  },
  create(context) {
    return {
      VariableDeclaration(node) {
        handleRule(context.options, ({ regex, replace, scope }) => {
          if (scope !== 'variable') return
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText(node)
          handleCodeAction(text, regex, replace, context, node)
        })
      },
      ImportDeclaration(node) {
        handleRule(context.options, ({ regex, replace, scope }) => {
          if (scope !== 'import-path') return
          const importPath = node.source.value
          const newImportPath = String(importPath).replace(regex, replace)
          if (importPath !== newImportPath) {
            context.report({
              node,
              messageId: 'replace',
              fix: fixer => {
                return fixer.replaceText(node.source, `'${newImportPath}'`)
              }
            })
          }
        })
      },
      Program(node) {
        handleRule(context.options, ({ regex, replace, scope }) => {
          if (scope !== 'global') return
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText(node)
          handleCodeAction(text, regex, replace, context, node)
        })
      },
    }
  },
}

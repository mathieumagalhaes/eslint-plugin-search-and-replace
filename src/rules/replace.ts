import { Rule } from 'eslint'
import { Node, ImportDeclaration } from 'estree'

interface RuleOptions {
  search: string
  replace: string
  caseSensitive?: boolean
  scope?: 'global' | 'variable' | 'import-path'
}

interface ParsedOptions {
  regex: RegExp
  replace: string
  scope: string
}

const parseOptions = (optionsDTO: RuleOptions): ParsedOptions => {
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

const handleRule = (optionsDTO: RuleOptions | RuleOptions[], callback: (options: ParsedOptions) => void): ParsedOptions | void => {
  if (!Array.isArray(optionsDTO) && typeof optionsDTO !== 'object') return
  if (Array.isArray(optionsDTO)) {
    optionsDTO.forEach(option => callback(parseOptions(option)))
  } else {
    return parseOptions(optionsDTO)
  }
}

const handleCodeAction = (text: string, regex: RegExp, replace: string, context: Rule.RuleContext, node: Node): void => {
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

const rule: Rule.RuleModule = {
  meta: {
    fixable: 'code' as const,
    type: 'suggestion' as const,
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
  create(context: Rule.RuleContext) {
    const options = context.options as RuleOptions | RuleOptions[]

    return {
      VariableDeclaration(node: Node) {
        handleRule(options, ({ regex, replace, scope }) => {
          if (scope !== 'variable') return
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText(node)
          handleCodeAction(text, regex, replace, context, node)
        })
      },
      ImportDeclaration(node: ImportDeclaration) {
        handleRule(options, ({ regex, replace, scope }) => {
          if (scope !== 'import-path') return
          const importPath = node.source.value as string
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
      Program(node: Node) {
        handleRule(options, ({ regex, replace, scope }) => {
          if (scope !== 'global') return
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText(node)
          handleCodeAction(text, regex, replace, context, node)
        })
      },
    }
  },
}

export { rule }
export default rule

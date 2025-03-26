import { RuleTester } from 'eslint'
import { rule } from '../dist/rules/replace.js'

const tester = new RuleTester({
  languageOptions: {
    sourceType: 'module'
  }
})

tester.run('replace', rule, {
  valid: [
    {
      code: `import test from 'test'`,
      options: [{ search: 'not_test', replace: 'not_test2' }]
    },
    {
      code: `import test from 'test'`,
      options: [{ search: 'not_test', replace: 'not_test2', caseSensitive: false }]
    },
    {
      code: `var test = 'test'`,
      options: [{ search: 'test2', replace: 'test2', scope: 'variable' }]
    },
    {
      code: `import test from 'test'`,
      options: [{ search: 'test2', replace: 'test2', scope: 'import-path' }]
    },


  ],
  invalid: [
    {
      code: `import test from 'test'`,
      options: [{ search: 'test', replace: 'test2' }],
      output: `import test2 from 'test2'`,
      errors: [
        {
          messageId: 'replace',
          line: 1,
          column: 1,
        }
      ]
    },
    {
      code: `import test from 'test'`,
      options: [{ search: 'Test', replace: 'Test2', caseSensitive: false }],
      output: `import Test2 from 'Test2'`,
      errors: [
        {
          messageId: 'replace',
          line: 1,
          column: 1,
        }
      ]
    },
    {
      code: `var test = 'test'`,
      options: [{ search: 'test', replace: 'test2', scope: 'variable' }],
      output: `var test2 = 'test2'`,
      errors: [
        {
          messageId: 'replace',
          line: 1,
          column: 1,
        }
      ]
    },
    {
      code: `import test from 'test'`,
      options: [{ search: 'test', replace: 'test2', scope: 'import-path' }],
      output: `import test from 'test2'`,
      errors: [
        {
          messageId: 'replace',
          line: 1,
          column: 1,
        }
      ]
    },
  ]
})

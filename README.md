<h1 align="center">@mathieumagalhaes/eslint-plugin-search-and-replace</h1>

<p align="center">
  <a href="https://cdn.jsdelivr.net/npm/@mattickx/global-dom-listener/dist/index.umd.js"><img alt="CDN Package size" src="https://img.shields.io/badge/CDN-<_2kB-blue"></a>
  &nbsp;
  <a href="https://www.npmjs.com/package/@mattickx/global-dom-listener"><img alt="NPM Downloads per week" src="https://img.shields.io/npm/dw/@mattickx/global-dom-listener"></a>
  &nbsp;
  <a href="https://github.com/mattickx/global-dom-listener/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/mattickx/global-dom-listener"></a>
</p>

<p align="center">
An ESLint plugin that allows you to perform text replacements in your JavaScript/TypeScript code through ESLint rules. This plugin supports global replacements, variable name replacements, and import path modifications.
</p>

<p align="center">
 <a href="#installation">Installation</a> |
 <a href="#usage">Usage</a> |
 <a href="#examples">Examples</a>
</p>

## ⚙️ Installation

```bash
pnpm install --save-dev @mathieumagalhaes/eslint-plugin-search-and-replace
```

```bash
yarn install --save-dev @mathieumagalhaes/eslint-plugin-search-and-replace
```

```bash
npm install --save-dev @mathieumagalhaes/eslint-plugin-search-and-replace
```

## 🔧 Usage

Add `@mathieumagalhaes/search-and-replace` to the plugins section of your `.eslintrc` configuration file:

```json
{
    "plugins": [
        "@mathieumagalhaes/search-and-replace"
    ]
}
```

### Rule Configuration

The replace rule accepts the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `search` | string | - | The text or pattern to search for |
| `replace` | string | - | The text to replace matches with |
| `caseSensitive` | boolean | `true` | Whether the search should be case sensitive |
| `scope` | string | `"global"` | The scope of replacement. Can be `"global"`, `"variable"`, or `"import-path"` |

Then configure the rules you want to use under the rules section:

```json
{
    "rules": {
        "@mathieumagalhaes/search-and-replace/replace": ["error", {
            "search": "foo",
            "replace": "bar"
        }]
    }
}
```

## 🔧 Examples

### Global Text Replacement

```json
{
    "rules": {
        "@mathieumagalhaes/search-and-replace/replace": ["error", {
            "search": "oldText",
            "replace": "newText"
        }]
    }
}
```

### Case-Insensitive Replacement

```json
{
    "rules": {
        "@mathieumagalhaes/search-and-replace/replace": ["error", {
            "search": "oldtext",
            "replace": "newText",
            "caseSensitive": false
        }]
    }
}
```

### Variable Name Replacement

```json
{
    "rules": {
        "@mathieumagalhaes/search-and-replace/replace": ["error", {
            "search": "oldVar",
            "replace": "newVar",
            "scope": "variable"
        }]
    }
}
```

### Import Path Replacement

```json
{
    "rules": {
        "@mathieumagalhaes/search-and-replace/replace": ["error", {
            "search": "@old-package",
            "replace": "@new-package",
            "scope": "import-path"
        }]
    }
}
```

### Multiple Replacement Rules

You can also configure multiple replacement rules by passing an array:

```json
{
    "rules": {
        "@mathieumagalhaes/search-and-replace/replace": ["error", [
            {
                "search": "oldText",
                "replace": "newText"
            },
            {
                "search": "anotherOld",
                "replace": "anotherNew",
                "scope": "variable"
            }
        ]]
    }
}
```

## 🤝 Contribute
Continuous improvement is encouraged and your contributions are valuable!

If you identify areas for improvement, have suggestions or encounter issues, please create a GitHub issue.

### Running locally

- Install dependencies.<br>
- You can edit `lib/rules/**` files.<br>
- Linting this codebase can be done with `pnpm/yarn/npm run lint`<br>
- Testing the codebase can be done with `pnpm/yarn/npm run test`<br>

Any added feature should have at least one valid and at least one invalid test case.

## 📜 LICENSE

This is licensed under the MIT License, see [LICENSE](./LICENSE.md)

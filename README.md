<h1 align="center">@mathieumagalhaes/eslint-plugin-search-and-replace</h1>

<p align="center">
  <img alt="CDN Package size" src="https://img.shields.io/npm/unpacked-size/@mathieumagalhaes/eslint-plugin-search-and-replace">
  &nbsp;
  <a href="https://www.npmjs.com/package/@mathieumagalhaes/eslint-plugin-search-and-replace"><img alt="NPM Downloads per week" src="https://img.shields.io/npm/dw/@mathieumagalhaes/eslint-plugin-search-and-replace"></a>
  &nbsp;
  <a href="https://github.com/mathieumagalhaes/eslint-plugin-search-and-replace/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/mathieumagalhaes/eslint-plugin-search-and-replace"></a>
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
pnpm add -D @mathieumagalhaes/eslint-plugin-search-and-replace
```

```bash
yarn add --dev @mathieumagalhaes/eslint-plugin-search-and-replace
```

```bash
npm install --save-dev @mathieumagalhaes/eslint-plugin-search-and-replace
```

## 🔧 Usage

```js
import searchAndReplace from "@mathieumagalhaes/eslint-plugin-search-and-replace";

export default [
    {
        plugins: {
            'search-and-replace': searchAndReplace
        }
    }
];
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
        "search-and-replace/replace": ["error", {
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
        "search-and-replace/replace": ["error", {
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
        "search-and-replace/replace": ["error", {
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
        "search-and-replace/replace": ["error", {
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
        "search-and-replace/replace": ["error", {
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
        "search-and-replace/replace": ["error", [
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
- Run `pnpm/yarn/npm run dev`
- You can edit `src/rules/**` typescript files.<br>
- Linting this codebase can be done with `pnpm/yarn/npm run lint`<br>
- Testing the codebase (after changes and build succesfully) can be done with `pnpm/yarn/npm run test`<br>

Any added feature should have at least one valid and at least one invalid test case.

## 📜 LICENSE

This is licensed under the MIT License, see [LICENSE](./LICENSE.md)

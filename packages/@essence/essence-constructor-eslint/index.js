import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import compat from 'eslint-plugin-compat';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import * as path from 'path';

export default [
    {
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                process: 'readonly',
                JSX: 'readonly',
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                process: 'readonly',
                JSX: 'readonly',
                WebKitCSSMatrix: 'readonly',
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            compat,
            prettier,
        },
        rules: {
            ...typescript.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            /*
         * Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
         * e.g. "@typescript-eslint/explicit-function-return-type": "off",
         */
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "react/prop-types": "off",
            "no-magic-numbers": "off",
            "max-lines-per-function": ["error", 150],
            "max-statements": ["error", 20],
            "func-names": "off",
            "react/display-name": "off",
            "function-call-argument-newline": "off",

            // Checks rules of Hooks
            "react-hooks/rules-of-hooks": "error",
            // Checks effect dependencies
            "react-hooks/exhaustive-deps": "warn",

            "jsx-quotes": ["error", "prefer-double"],
            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                },
            ],
            "import/no-unresolved": [
                "error",
                {
                    commonjs: true,
                    caseSensitive: true,
                },
            ],
            "import/extensions": [
                "error",
                "always",
                {
                    js: "never",
                    jsx: "never",
                    ts: "never",
                    tsx: "never",
                },
            ],
            "import/no-extraneous-dependencies": "error",
            "import/first": 2,
            "import/no-duplicates": 2,
            "import/newline-after-import": 2,
            "no-console": 1,
            "no-debugger": 2,
            "comma-spacing": 2,
            "block-spacing": 2,
            "no-var": 2,
            "sort-keys": 2,
            "quote-props": [2, "as-needed"],
            quotes: 2,
            "one-var": [2, "never"],
            "keyword-spacing": 2,
            "key-spacing": 2,
            "space-before-blocks": 2,
            "space-before-function-paren": [
                "error",
                {
                    anonymous: "always",
                    named: "never",
                    asyncArrow: "always",
                },
            ],
            "space-in-parens": 2,
            "space-infix-ops": 2,
            "space-unary-ops": 2,
            "spaced-comment": 2,
            "array-bracket-spacing": 2,
            "computed-property-spacing": 2,
            "func-call-spacing": 2,
            "object-curly-spacing": 2,
            "semi-spacing": 2,
            "switch-colon-spacing": 2,
            "template-tag-spacing": 2,
            "max-len": [
                2,
                140,
                4,
                {
                    ignoreUrls: false,
                    ignoreComments: false,
                    ignoreTrailingComments: false,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: false,
                    ignoreRegExpLiterals: false,
                },
            ],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    "argsIgnorePattern": "^_",
                    "caughtErrors": "all",
                    "caughtErrorsIgnorePattern": "^_",
                    "destructuredArrayIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "ignoreRestSiblings": true
                }
            ],
            "no-use-before-define": "off",
            "@typescript-eslint/no-use-before-define": ["error", { functions: true, classes: true }],
            curly: 2,

            "react/no-unescaped-entities": 0,
            "no-ternary": 0,
            "require-jsdoc": 0,
            "no-process-env": 0,
            "sort-imports": 0,
            "func-style": 0,
            "no-underscore-dangle": 0,
            "no-undefined": 0,
            "no-invalid-this": 0,
            "no-warning-comments": 1,
            "class-methods-use-this": 0,
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"],
                },
            ],
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "interface",
                    format: ["PascalCase"],
                    custom: {
                        regex: "^I[A-Z]",
                        match: true,
                    },
                },
            ],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "jsx-a11y/no-static-element-interactions": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            // TODO: remove this rule after fix all issues
            "jsx-a11y/mouse-events-have-key-events": "off",
            "jsx-a11y/click-events-have-key-events": "off",
            "jsx-a11y/tabindex-no-positive": "off",
            "jsx-a11y/no-noninteractive-element-interactions": "off",
            "jsx-a11y/no-noninteractive-tabindex": "off",
            "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
            "jsx-a11y/no-autofocus": "off",
            "jsx-a11y/label-has-associated-control": "off",
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
                alias: {
                    map: [
                        ["@essence-community/constructor-share", "./packages/@essence/essence-constructor-share/src"],
                        ["@essence-community/constructor-website", "./packages/@essence/essence-constructor-website/src"],
                        ["@essence-community/constructor-classes", "./packages/@essence/essence-constructor-classes/src"],
                    ],
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
            react: {
                version: 'detect',
            },
        },
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            '*.min.js',
            '*.bundle.js',
            'coverage/',
            'public/',
            'flow-typed/*'
        ],
    },
];
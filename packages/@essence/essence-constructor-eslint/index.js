/* eslint-disable max-len, sort-keys */
module.exports = {
    // Specifies the ESLint parser
    parser: "@typescript-eslint/parser",
    extends: [
        // Uses the recommended rules from @eslint-plugin-react
        "plugin:react/recommended",
        // Uses the recommended rules from @typescript-eslint/eslint-plugin
        "plugin:@typescript-eslint/recommended",
        // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        "prettier/@typescript-eslint",
        // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        "plugin:prettier/recommended",
        // Lint the browser compatibility of your code
        "plugin:compat/recommended",
    ],
    plugins: ["react-hooks", "import", "flowtype", "filenames"],
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: "module",
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx: true,
        },
    },
    rules: {
        /*
         * Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
         * e.g. "@typescript-eslint/explicit-function-return-type": "off",
         */
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
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
            120,
            4,
            {
                ignoreUrls: false,
                ignoreComments: false,
                ignoreTrailingComments: false,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
                ignoreRegExpLiterals: false,
            },
        ],
        "no-unused-vars": ["error", {vars: "all", args: "after-used"}],
        "no-use-before-define": ["error", {functions: true, classes: true}],
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
            {blankLine: "always", prev: "*", next: "return"},
            {blankLine: "always", prev: ["const", "let", "var"], next: "*"},
            {
                blankLine: "any",
                prev: ["const", "let", "var"],
                next: ["const", "let", "var"],
            },
        ],
        "flowtype/no-dupe-keys": 2,
        "filenames/match-exported": 2,
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
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".ts", ".tsx"],
            },
        },
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use
            version: "detect",
        },
        // "fetch", "Set", "Map", "URL", "Promise", "Object.entries", "Array.from" for all browser
        polyfills: [],
    },
    env: {
        browser: true,
    },
};

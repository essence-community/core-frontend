import config from '@essence-community/eslint-config-react';

export default [
    ...config,
    {
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
                alias: {
                    map: [
                        ["@essence-community/constructor-share", "../essence-constructor-share/src"],
                        ["@essence-community/constructor-website", "../essence-constructor-website/src"],
                        ["@essence-community/constructor-classes", "../essence-constructor-classes/src"],
                    ],
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
            react: {
                version: 'detect',
            },
        },
    }
];

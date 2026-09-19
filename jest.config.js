module.exports = {
    collectCoverageFrom: [
        "<rootDir>/packages/@essence/essence-constructor-website/src/**/*.{js,jsx,mjs}",
        "<rootDir>/packages/@essence/essence-constructor-share/src/**/*.{js,mjs,ts,tsx}",
        "<rootDir>/packages/@essence/essence-constructor-classes/src/**/*.{ts,tsx}",
    ],
    coveragePathIgnorePatterns: ["/node_modules/", "Story", "Styles", "Types", "Type.js"],
    coverageReporters: ["text", "cobertura", "lcov"],
    moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node", "mjs", "cjs", "ts", "tsx"],
    moduleNameMapper: {
        "^@essence-community/constructor-share$": "<rootDir>/packages/@essence/essence-constructor-share/src/index.ts",
        "^@essence-community/constructor-share/(.*)$": "<rootDir>/packages/@essence/essence-constructor-share/src/$1",
        "^react-native$": "react-native-web",
    },
    modulePathIgnorePatterns: ["<rootDir>/packages/.*/lib/"],
    setupFiles: ["<rootDir>/config/polyfills.js"],
    setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/packages/@essence/essence-constructor-website/src/**/__tests__/**/*.{js,jsx,mjs}",
        "<rootDir>/packages/@essence/essence-constructor-share/src/**/__tests__/**/*.{js,mjs,ts,tsx}",
        "<rootDir>/packages/@essence/essence-constructor-classes/src/**/__tests__/**/*.{ts,tsx}",
    ],
    testURL: "http://localhost",
    transform: {
        "^(?!.*\\.(js|jsx|ts|tsx|mjs|cjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\](?!(@essence|@mui|@emotion|p-limit|yocto-queue|uuid|i18next|clsx|mime)).+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    ],
};

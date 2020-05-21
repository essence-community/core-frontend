module.exports = {
    collectCoverageFrom: [
        "<rootDir>/packages/@essence/essence-constructor-website/src/**/*.{js,jsx,mjs}",
        "<rootDir>/packages/@essence/essence-constructor-share/src/**/*.{js,mjs,ts,tsx}",
        "<rootDir>/packages/@essence/essence-constructor-classes/src/**/*.{ts,tsx}",
    ],
    coveragePathIgnorePatterns: ["/node_modules/", "Story", "Styles", "Types", "Type.js"],
    coverageReporters: ["text", "cobertura", "lcov"],
    moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node", "mjs", "ts", "tsx"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
    },
    setupFiles: ["<rootDir>/config/polyfills.js", "<rootDir>/config/jest/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/packages/@essence/essence-constructor-website/src/**/__tests__/**/*.{js,jsx,mjs}",
        "<rootDir>/packages/@essence/essence-constructor-share/src/**/__tests__/**/*.{js,mjs,ts,tsx}",
        "<rootDir>/packages/@essence/essence-constructor-classes/src/**/__tests__/**/*.{ts,tsx}",
    ],
    testURL: "http://localhost",
    transform: {
        "^(?!.*\\.(js|jsx|ts|tsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\](?!@essence).+\\.(js|jsx|mjs|ts|tsx)$"],
};

/* eslint-disable sort-keys, prettier/prettier, quote-props */

export const formatChars: Record<string, string> = {
    "*": "[A-Za-z0-9]",
    "a": "[a-z]",
    "A": "[A-Z]",
    "0": "[0-9]",
    "9": "[0-9]",
    "S": ".",
    "Б": "[А-ЯЁ]",
    "R": "[IVX]"
}

export const validationCharacters: Record<string, string> = {
    "*": "[A-Za-z0-9]?",
    "a": "[a-z]",
    "A": "[A-Z]",
    "0": "[0-9]?",
    "9": "[0-9]",
    "S": ".?",
    "Б": "[А-ЯЁ]",
    "R": "[IVX]{1,6}",
    ".": "\\.",
    "?": "\\?",
    "+": "\\+",
    "{": "\\{",
    "}": "\\}",
    "(": "\\(",
    ")": "\\)",
    "[": "\\[",
    "]": "\\]",
    "^": "\\^",
    "$": "\\$"
}

export const validCharToVal: Record<string, string> = {
    "*": "A",
    "a": "a",
    "A": "Z",
    "0": "0",
    "9": "9",
    "S": "A",
    "Б": "Б",
    "R": "I"
}

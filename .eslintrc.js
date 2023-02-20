export default {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": 0,
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
}

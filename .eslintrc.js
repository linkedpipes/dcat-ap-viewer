module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["error", "double"],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "comma-dangle": ["error", "always-multiline"],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "max-len": ["error", {
      "code": 80,
      "ignoreUrls": true,
      "ignoreRegExpLiterals": true,
    }],
  },
  "plugins": [
    "jest"
  ],
  "env": {
    "jest/globals": true,
    "es2021": true,
    "node": true,
  }
};
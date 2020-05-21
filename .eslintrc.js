module.exports = {
  "root": true,
  "extends": [
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["error", "double"],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "comma-dangle": ["error", "always-multiline"],
  },
  "plugins": ["jest"],
  "env": {
    "jest/globals": true
  }
};
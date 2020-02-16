module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module"
  },
  "extends": ["plugin:jest/recommended", "plugin:jest/style"],
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
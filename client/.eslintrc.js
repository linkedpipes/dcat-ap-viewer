module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  "plugins": [
    "react",
  ],
  "env": {
    "browser": true,
    "es6": true,
  },
  "rules": {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "max-len": ["error", {
      "code": 80,
      "ignoreUrls": true,
      "ignoreRegExpLiterals": true,
    }],
    "curly": [2, "all"],
    "brace-style": ["error", "1tbs"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
    }],
    "object-shorthand": ["error", "never"],
    "quote-props": ["error", "always"],
    "no-use-before-define": ["error", "nofunc"],
    "prefer-destructuring": 0,
    "func-names": ["error", "as-needed"],
    "no-restricted-syntax": 0,
    "no-continue": 0,
  },
  "parser": "babel-eslint",
  "settings": {
    "react": {
      "version": "detect",
    }
  },
  "globals": {
    "process": false,
    "module": false,
  },
};

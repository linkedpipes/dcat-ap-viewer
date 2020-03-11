module.exports = {
  "extends": [
    "eslint:recommended",
  ],
  "env": {
    "es6": true,
  },
  "rules": {
    "quotes": ["error", "double"],
    "object-shorthand": ["error", "never"],
    "quote-props": ["error", "always"],
    "no-use-before-define": ["error", "nofunc"],
    "prefer-destructuring": 0,
    "no-console": [0]
  },
  "settings": {
    "react": {
      "version": "detect",
    }
  },
  "globals": {
    "module": false,
    "process": false,
    "__dirname": false,
  },
};

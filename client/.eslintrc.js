module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
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
    "object-shorthand": ["error", "never"],
    "quote-props": ["error", "always"],
    "no-use-before-define": ["error", "nofunc"],
    "prefer-destructuring": 0,
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

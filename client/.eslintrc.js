module.exports = {
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  "env": {
    "browser": true,
    "node": false,
  },
  "rules": {
    "curly": [2, "all"],
    "brace-style": ["error", "1tbs"],
    "object-shorthand": ["error", "never"],
    "quote-props": ["error", "always"],
    "no-use-before-define": ["error", "nofunc"],
    "prefer-destructuring": 0,
    "func-names": ["error", "as-needed"],
    "no-restricted-syntax": 0,
    "no-continue": 0,
  },
  "settings": {
    "react": {
      "version": "detect",
    }
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "process": false,
    "module": false,
  },
};

module.exports = {
  "verbose": true,
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/client/$1",
    // Enable import of style files with preserving className lookups.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  "modulePaths": [
    "./client/",
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    ".*": "babel-jest",
  },
};

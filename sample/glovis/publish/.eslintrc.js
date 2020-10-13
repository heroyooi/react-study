module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'wiremore',
    'wiremore/react',
    'prettier',
    'prettier/react',
    'plugin:flowtype/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        "extensions" : [ ".js" , ".jsx" ]
      }
    }
  },
  plugins: [
    'babel', 'import', 'prettier', 'flowtype', 'security'
  ],
  rules: {
    "eslint linebreak-style": [0, 'error ', 'windows'],
    "linebreak-style": 0,
    "semi": [2, 'always'],
    'security/detect-object-injection': 0
  },
};

module.exports = {
  'extends': [
    'standard'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      legacyDecorators: true
    }
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['warn', 'single'],
    'semi': [1, 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'no-useless-constructor': 'off',
    'no-unused-vars': 'warn',
    'no-new': 'warn',
    'new-cap': 'off',
    'eol-last': ['error', 'always']
  }
};

module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended'
  ],
  'parserOptions': {
    'parser': 'babel-eslint'
  },
  'rules': {
    'indent': ['error', 2],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'no-param-reassign': 0,
    'max-len': [
      2,
      {
        code: 240,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: 'data:image',
      },
    ],
    'no-dupe-keys': 2,
    'block-spacing': 2,
    'eqeqeq': 2,
    'no-var': 2,
    'no-plusplus': 0,
    'space-before-function-paren':2,
    'space-before-blocks': 2,
    'space-infix-ops': 2,
    'space-unary-ops': 2,
    'space-in-parens': 2,
    'quotes': ['error', 'single'],
    'no-multiple-empty-lines': 2,
    'computed-property-spacing': [2, 'never'],
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'array-callback-return': 0,
    'global-require': 0,
    radix: 0,
    'no-console': 0,
    'consistent-return': 1,
    'class-methods-use-this': 0,
    'no-buffer-constructor': 1,
    'no-continue': 0,
    camelcase: 0,
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'no-debugger': 0,
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': 0,
    'operator-assignment': 0,
    'vue/attributes-order': 0,
    'vue/attribute-hyphenation': 0,
    'vue/no-use-v-if-with-v-for': 0,
    strict: 0,
    'lines-between-class-members': 0,
    'operator-linebreak': 0,
    'no-else-return': 0,
    'vue/no-mutating-props': 0,
    'vue/require-prop-type-constructor': 0,
    'vue/return-in-computed-property': 0,

    'vue/require-default-prop': 0,
    'vue/no-unused-components': 0,
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': ['error', {
      'ignoreWhenNoAttributes': false,
      'ignoreWhenEmpty': false,
      'ignores': ['pre', 'textarea']
    }],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/no-multi-spaces': ['error', {
      'ignoreProperties': false
    }],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/multiline-html-element-content-newline': ['error', {
      'ignoreWhenEmpty': true,
      'ignores': ['pre', 'textarea'],
      'allowEmptyLines': false
    }],
    'vue/html-end-tags':2,
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never' ,
      'selfClosingTag': 'never'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }]
  }
}
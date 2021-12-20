module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "indent": ["error", 2],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    "no-param-reassign": 0,
    "max-len": [
      2,
      {
        code: 240,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: "data:image",
      },
    ],
    "no-plusplus": 0,
    "vue/html-self-closing": 0,
    "comma-dangle": 0,
    "vue/require-default-prop": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "array-callback-return": 0,
    "global-require": 0,
    radix: 0,
    "no-console": 0,
    "consistent-return": 1,
    "class-methods-use-this": 0,
    "no-buffer-constructor": 1,
    "no-continue": 0,
    camelcase: 0,
    "vue/attributes-order": 0,
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "no-debugger": 0,
    "vue/attribute-hyphenation": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "no-multiple-empty-lines": 0,
    strict: 0,
    "lines-between-class-members": 0,
    "operator-linebreak": 0,
    "no-else-return": 0,
    "vue/no-mutating-props": 0,
    "vue/require-prop-type-constructor": 0,
    "vue/return-in-computed-property": 0,
    "object-curly-newline": 0,
    "operator-assignment": 0,
    "vue/no-unused-components": 0,
    'vue/html-indent': ['error', 2],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: {
          max: 3,
          allowFirstLine: true,
        },
      },
    ]
  }
}
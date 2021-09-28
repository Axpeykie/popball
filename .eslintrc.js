module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'vue/no-multiple-template-root': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-continue': 'off'
  }
}

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true,
//     node: true
//   },
//   extends: [
//     'plugin:vue/essential',
//     'airbnb-base',
//     'plugin:prettier/recommended',
//     'plugin:jest/recommended'
//   ],
//   parserOptions: {
//     ecmaVersion: 12,
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module'
//   },
//   plugins: ['vue', '@typescript-eslint'],
//   rules: {
//     'arrow-parens': 'off',
//     'comma-dangle': ['off'],
//     'eol-last': 'off',
//     'generator-star-spacing': 'off',
//     'no-unused-vars': 'off',
// 'import/no-unresolved': 'off',
// 'import/extensions': 'off',
//     'import/no-absolute-path': 'off',
//     'import/no-extraneous-dependencies': 'off',
//     'vue/no-multiple-template-root': 'off',
//     '@typescript-eslint/no-unresolved': 'off',
//     'prefer-promise-reject-errors': 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-param-reassign': 'off',
//     'vue/no-v-model-argument': 'off',
//     'no-useless-constructor': 'off',
//     'space-before-function-paren': [
//       'error',
//       {
//         anonymous: 'always',
//         named: 'never',
//         asyncArrow: 'always'
//       }
//     ],
//     // fix 定义ts的枚举 enum时 eslint提示no-shadow的错误
//     'no-shadow': 'off',
//     '@typescript-eslint/no-shadow': ['error']
//   },
//   settings: {}
// }

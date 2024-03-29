module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
  ],
  plugins: ['prettier', 'unused-imports', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'max-len': [
      2,
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreUrls: false,
        ignoreStrings: true, // allow long strings for SQL queries
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: false,
      },
    ],
    'linebreak-style': 0,
    semi: 2,
    'no-undef': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 2,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'max-classes-per-file': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'unused-imports/no-unused-imports': 1,
    'no-console': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/default-param-last': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/lines-between-class-members': 0,
  },
};

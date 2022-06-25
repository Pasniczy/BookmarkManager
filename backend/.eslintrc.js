module.exports = {
  root: true,
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    semi: 2,
    'no-undef': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 2,
    'consistent-return': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'unused-imports/no-unused-imports': 1,
    'no-console': 0,
  },
  overrides: [
    {
      files: '*.ts',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/comma-dangle': 0,
      },
    },
  ],
};

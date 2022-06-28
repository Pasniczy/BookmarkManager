module.exports = {
  root: true,
  extends: ['airbnb-base'],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    'max-len': [2, 120],
    'linebreak-style': 0,
    semi: 2,
    'no-undef': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 2,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'unused-imports/no-unused-imports': 1,
    'no-console': 0,
  },
  overrides: [
    {
      files: './**/*.ts',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/comma-dangle': 0,
        '@typescript-eslint/lines-between-class-members': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
      },
    },
    {
      files: ['./**/*.spec.ts', './**/*.test.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};

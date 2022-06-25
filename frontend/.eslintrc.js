module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  extends: ['plugin:prettier/recommended', 'airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime'],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    'prettier/prettier': 2,
    semi: 2,
    'no-undef': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 2,
    'no-trailing-spaces': 2,
    'import/no-extraneous-dependencies': 0,
    'unused-imports/no-unused-imports': 1,
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript',
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

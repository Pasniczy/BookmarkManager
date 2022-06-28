module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
  ],
  plugins: ['prettier', 'unused-imports', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'max-len': [2, 120],
    'linebreak-style': 0,
    semi: 2,
    'no-undef': 0,
    'no-shadow': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'no-nested-ternary': 2,
    'no-trailing-spaces': 2,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'unused-imports/no-unused-imports': 1,
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/default-param-last': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/lines-between-class-members': 0,
  },
};

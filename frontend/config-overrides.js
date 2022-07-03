const { override, fixBabelImports } = require('customize-cra');
const { aliasDangerous, configPaths } = require('react-app-rewire-alias/lib/aliasDangerous');

module.exports = override(
  aliasDangerous(configPaths('./tsconfig.paths.json')),
  fixBabelImports('babel-plugin-direct-import', {
    modules: ['@mui/material', '@mui/icons-material'],
  }),
  fixBabelImports('@mui/material', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  }),
  fixBabelImports('@mui/icons-material', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  })
);

const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override (webpackConfig, env) {
  // do stuff with the webpack config...
  webpackConfig = injectBabelPlugin(['import', { libraryName: 'antd-mobile', libraryDirectory: 'es', style: 'css' }], webpackConfig);
  webpackConfig.resolve.alias['@'] = `${__dirname}/src`;
  console.log("webpackConfig", webpackConfig);
  return webpackConfig;
};

const webpack = require('webpack');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  const config = genDefaultConfig(storybookBaseConfig, configType);

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader' // creates style nodes from JS strings
      },
      {
        loader: 'css-loader' // translates CSS into CommonJS
      },
      {
        loader: 'sass-loader' // compiles Sass to CSS
      }
    ]
  });

  // Return the altered config
  return config;
};

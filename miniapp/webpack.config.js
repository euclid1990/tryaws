const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, argv) {
  let production = typeof (env) !== 'undefined' && env.production;
  let mode = process.env.NODE_ENV = production ? 'production' : 'development';
  return {
    mode: mode,
    devtool: production ? 'source-maps' : 'eval',
    entry: [ './src/assets/scripts/main.js', './src/assets/stylesheets/main.scss' ],
    output: {
      path: path.resolve(__dirname, 'src/public'),
      filename: 'js/[name].js',
      publicPath: 'public'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin([
        { from: 'src/assets/images', to: 'img' }
      ]),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
              outputPath: 'img',
              context: 'src/assets/images'
            }
          }]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
            chunks: 'all'
          }
        }
      }
    }
  };
};

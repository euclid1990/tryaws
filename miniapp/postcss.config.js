const path = require('path');
const resolveImport = require('postcss-import/lib/resolve-id');

module.exports = ({ file, options, env }) => {
  return {
    plugins: {
      'postcss-import': {
        filter: (id) => {
          // Ignore all node_modules import file start with [~] and put it into vendors.css
          return !(/^~/.test(id));
        },
        root: file.dirname,
        resolve: (id, basedir, importOptions) => {
          // Resolve node_modules, @import '~normalize.css/normalize.css', similar to how css-loader's handling of node_modules
          if (/^~/.test(id)) {
            id = path.resolve('./node_modules', id.slice(1));
          }
          return resolveImport(id, basedir, importOptions);
        }
      },
      'precss': { disable: '@import' },
      'autoprefixer': {}
    }
  };
};

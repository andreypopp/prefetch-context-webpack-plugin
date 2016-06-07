var path = require('path');
var PrefetchContext = require('../').default;

module.exports = {
  context: path.join(__dirname, 'src'),
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  plugins: [
    new PrefetchContext({loader: 'eslint-loader'}),
  ],
  eslint: {
    baseConfig: 'prometheusresearch',
  }
};

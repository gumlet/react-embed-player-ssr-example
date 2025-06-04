module.exports = {
  serverSideRendering: true,
  entryPoints: {
    main: './src/index.js',
  },
  overrideWebpackConfig: ({ webpackConfig }) => {
    // Override JS filenames
    webpackConfig.output.filename = 'static/js/[name].js';
    webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';

    // Disable code splitting (optional)
    webpackConfig.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    // Disable runtime chunk
    webpackConfig.optimization.runtimeChunk = false;

    // Remove plugins that inject hashes
    webpackConfig.plugins = webpackConfig.plugins.map(plugin => {
      if (
        plugin.constructor.name === 'MiniCssExtractPlugin'
      ) {
        plugin.options.filename = 'static/css/[name].css';
        plugin.options.chunkFilename = 'static/css/[name].chunk.css';
      }
      return plugin;
    });

    return webpackConfig;
  }
};

module.exports = {
  // for GitHub Pages
  outputDir: 'docs',
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias
        .set('chart.js', 'chart.js/dist/Chart.bundle.min.js');
    }
  },
};

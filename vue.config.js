module.exports = {
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false,
  pwa: {
    workboxOptions: {
      // iOSのキャッシュがアップデートされない問題の対策
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias
        .set('chart.js', 'chart.js/dist/Chart.bundle.min.js');
    }
  },
};

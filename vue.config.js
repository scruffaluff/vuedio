// VueJS JavaScript framework configuration file.
//
// For more information, visit https://cli.vuejs.org/config.

module.exports = {
  // Avoids WebPack asset size limit warnings.
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(1_000_000).maxAssetSize(1_000_000);
  },
  publicPath: process.env.NODE_ENV === "production" ? "/vuedio/" : "/",
  transpileDependencies: ["vuetify"],
};

const withFonts = require("next-fonts");

module.exports = {
  compress: true,
  images: {
    domains: [process.env.DOMAIN ? process.env.DOMAIN : "b-aoe.io",'baoe.grooo.com.vn',"b-aoe.io"],
  },
  // env: {
  //   DISABLE_CONNECT: process.env.DISABLE_CONNECT,
  //   DISABLE_COUNT: process.env.DISABLE_COUNT,
  // },
  publicRuntimeConfig: {
    ENABLED_CONNECT: process.env.ENABLED_CONNECT,
    PRIVATE_SALE_DEPOSIT: process.env.PRIVATE_SALE_DEPOSIT,
    PRIVATE_SALE_REGISTER: process.env.PRIVATE_SALE_REGISTER,
    IDO_RECEIVE_ADDRESS: process.env.IDO_RECEIVE_ADDRESS,
    PRIVATE_SALE_RECEIVE_ADDRESS: process.env.PRIVATE_SALE_RECEIVE_ADDRESS,
    BUSD_ADDRESS: process.env.BUSD_ADDRESS,
    API_DOMAIN: process.env.API_DOMAIN
  },
  webpack: (config, options) => {
    // This allows the app to refer to files through our symlink
    config.resolve.symlinks = false
    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "url-loader?limit=100000",
        },
        {
          loader: "file-loader",
        }
      ],
    });
    return config
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}

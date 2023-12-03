const { defineConfig } = require('@vue/cli-service')
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    allowedHosts: [
        'cpolar.top',
        '.cpolar.top',
      'natappfree.cc', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.natappfree.cc'   // .是二级域名的通配符
    ],
    proxy: {
      '/api': {
        target: 'https://localhost:8085',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        }
      },
      '/socket.io':{
        target: 'https://localhost:8085',
        changeOrigin: true,
        ws:true
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
          ]
        },
      },
    },
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: 'worker-loader',
        options: { inline: true, name: 'workerName.[hash].js' }
      }
    })
  },
  chainWebpack: config => {
    config.output.globalObject('this')
  },
  parallel: false
})

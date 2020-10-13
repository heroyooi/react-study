// next.config.js
const withCSS = require('@zeit/next-css')
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
module.exports = withCSS({
  compress: true,
  crossOrigin: 'anonymous',
  distDir: 'build',
  serverRuntimeConfig: {
  },
  publicRuntimeConfig: {
    staticFolder: isDev ? '' : 'http://polarium.iptime.org:8090'
  },
  env: {
    systemEnv: 'publisher'
  }
})

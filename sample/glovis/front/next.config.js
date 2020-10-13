// next.config.js
const withCSS = require('@zeit/next-css');
const dotenv = require('dotenv');
dotenv.config();
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

module.exports = withCSS({
  env: {
    HOSTURL: process.env.HOSTURL,
    hostURL: isDev ? 'localhost' : '10.6.214.21',
    systemEnv: isProd ? 'production' : 'local',
    IMGURL: isDev ? process.env.IMGURL_DEV : process.env.IMGURL,
    IMGURLS: process.env.IMGURLS,
    FRONT_URL: isProd ? 'http://10.6.214.21' : process.env.FRONTURL || 'http://localhost'
  },
  compress: true,
  crossOrigin: 'anonymous',
  distDir: 'build',
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    staticFolder: isDev ? '' : ''
  },
  optimization: {
    providedExports: true
  }
});

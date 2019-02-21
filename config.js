const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  apiDomain: '/api',
  rootAlias: NODE_ENV === 'development' ? '' : '/oil',
  basePath: __dirname,
  srcDir: path.resolve(__dirname, 'src'),
  outDir: path.resolve(__dirname, 'dist'),
  publicPath: NODE_ENV === 'development' ? '/' : './',
  port: 8080,
  proxy: {
    '/api': {
      target: 'https://api4.wlwulian.com/api',  // https://wlTestApi.wlwulian.com/api
      changeOrigin: true,
      //修改代理响应头cookie域名与开发域名一致，方便登录认证
      cookieDomainRewrite: '127.0.0.1',
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
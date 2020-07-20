module.exports = {
  publicPath: './',
  assetsDir: 'static/invoice/zzs',
  indexPath: 'html/zzs_index.html',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  devServer: {
    // 设置主机地址
    // host: '192.168.0.100',

    // 设置默认端口
    port: 8080,
    // 设置自动启动浏览器
    // open: true,

    // 设置代理
    proxy: {
      '/wechat': {
        // 目标 API 地址，跨域请求时目标地址要使用根目录，保证session一致。
        target: 'http://localhost/',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
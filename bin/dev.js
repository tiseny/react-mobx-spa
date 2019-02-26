const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const compress = require('compression')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('../webpack/dev.config')
const config = require('../config')
const app = express()
const compiler = webpack(webpackConfig)

const http = require('http').Server(app);
const io = require('socket.io')(http);
// Set port
app.set('port', config.port)
app.use(compress())

const devMiddleware = webpackDevMiddleware(compiler, {
  quiet: false,
  noInfo: false,
  lazy: false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats: 'errors-only',
})

devMiddleware.waitUntilValid(() => {
  opn('http://localhost:' + config.port + config.rootAlias)
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  log: false
})

Object.keys(config.proxy).forEach((context) => {
  let options = config.proxy[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)
app.use(express.static(config.basePath))


http.listen(config.port, () => {
  console.log('listening on ' + app.get('port'))
})


io.on('connection', (socket) => {

  socket.on('online', function(data) {
    io.emit('online', data)
  })

  socket.on('message', function (data) {
    io.emit('message', data);
  });

  socket.on('offline', function(data) {
    console.log(data)
    io.emit('offline', data)
  })

})

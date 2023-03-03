module.exports = {
  set: {
    http: function () {
      return [
        { method: 'get', path: '/openapi', src: './src/plugins/openapi/handler/all', config: { timeout: 30 } },
        { method: 'get', path: '/openapi/*', src: './src/plugins/openapi/handler/oneof', config: { timeout: 30 } }
      ]
    },
  },
}

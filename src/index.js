module.exports = {
  set: {
    http: function () {
      return [
        { method: 'get', path: '/openapi', src: './node_modules/@enhance/arc-plugin-openapi/src/handler/all', config: { timeout: 30 } },
        { method: 'get', path: '/openapi/*', src: './node_modules/@enhance/arc-plugin-openapi/src/handler/oneof', config: { timeout: 30 } }
      ]
    },
  },
}

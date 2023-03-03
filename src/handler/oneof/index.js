module.exports = {
  handler: async function (req) {
    const { proxy } = req.pathParameters

    let spec = (await import(`@architect/views/models/openapi/${proxy}.mjs`)).default

    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: `<html>
    <head>
        <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js" charset="UTF-8"></script>
        <link href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css" rel="stylesheet">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script>
            SwaggerUIBundle({
                spec: ${JSON.stringify(spec)},
                dom_id: '#swagger-ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIBundle.SwaggerUIStandalonePreset
                ],
            })
        </script>
    </body>
</html>`}
  }
}

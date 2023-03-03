const fs = require('fs');

module.exports = {
  handler: async function () {
    const specs = []
    const openapiFiles = fs.readdirSync('./node_modules/@architect/views/models/openapi')

    await Promise.all(openapiFiles.map(async (file) => {
      let spec = (await import(`@architect/views/models/openapi/${file}`)).default
      let model = await import(`@architect/views/models/schemas/${file}`)
      spec.components.schemas = { ...model }
      console.log(spec)
      specs.push({oas: spec})
    }));

    let { merge, isErrorResult } = await import('openapi-merge')
    console.log("specs", specs)
    const mergeResult = merge(specs)
    if (isErrorResult(mergeResult)) {
      console.error(`${mergeResult.message} (${mergeResult.type})`);
    } else {
      console.log(`Merge successful!`);
    }

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
                spec: ${JSON.stringify(mergeResult.output)},
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

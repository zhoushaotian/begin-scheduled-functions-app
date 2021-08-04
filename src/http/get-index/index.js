let data = require('@begin/data')
let HTML = require('@architect/views/doc')

exports.handler = async function http (req) {
  let { rawPath } = req
  let visits

  if (rawPath === '/') {
    let result = await data.incr({
      table: 'my-data',
      key: 'site',
      prop: 'visits'
    })
    visits = result.visits
    console.log('Stored a visit')
  }

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: HTML({ visits })
  }
}


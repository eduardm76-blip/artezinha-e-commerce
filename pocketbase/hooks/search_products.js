routerAdd('POST', '/backend/v1/search/products', (e) => {
  const body = e.requestInfo().body || {}
  const query = (body.query || '').trim()
  if (!query) return e.badRequestError('missing query')

  const embedRes = $ai.embed({ input: query })
  const results = $vectors.search(e, 'products', {
    field: 'embedding',
    query: embedRes.data[0].embedding,
    k: body.k || 20,
  })

  return e.json(200, results)
})

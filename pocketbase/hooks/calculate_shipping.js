routerAdd('POST', '/backend/v1/shipping/calculate', (e) => {
  const body = e.requestInfo().body || {}
  const cep = (body.cep || '').replace(/\D/g, '')
  if (cep.length !== 8) return e.badRequestError('CEP inválido')

  const prefix = parseInt(cep.substring(0, 2))
  var regionAdjust = 0
  if (prefix >= 80) {
    regionAdjust = 20
  } else if (prefix >= 60) {
    regionAdjust = 15
  } else if (prefix >= 40) {
    regionAdjust = 10
  } else if (prefix >= 20) {
    regionAdjust = 5
  }

  return e.json(200, {
    options: [
      { type: 'pac', price: 15.9 + regionAdjust, days: '7-10 dias úteis' },
      { type: 'sedex', price: 35.9 + regionAdjust, days: '2-3 dias úteis' },
    ],
  })
})

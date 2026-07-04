onRecordAfterUpdateSuccess((e) => {
  const nameChanged = e.record.getString('name') !== e.record.original().getString('name')
  const descChanged =
    e.record.getString('description') !== e.record.original().getString('description')
  const catChanged = e.record.getString('category') !== e.record.original().getString('category')
  if (!nameChanged && !descChanged && !catChanged) return e.next()
  const name = e.record.getString('name')
  const desc = e.record.getString('description')
  const cat = e.record.getString('category')
  const text = (name + ' ' + desc + ' ' + cat).trim()
  if (!text) return e.next()
  try {
    const res = $ai.embed({ input: text })
    const record = $app.findRecordById('products', e.record.id)
    record.set('embedding', res.data[0].embedding)
    $app.save(record)
  } catch (err) {
    console.log('embedding failed for product ' + e.record.id, err.message)
  }
  return e.next()
}, 'products')

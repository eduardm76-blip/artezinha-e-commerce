migrate(
  (app) => {
    const productsCol = app.findCollectionByNameOrId('products')

    const seedData = []

    for (let i = 0; i < 20; i++) {
      const num = (i + 1).toString().padStart(2, '0')
      const isShirt = i % 3 === 0
      seedData.push({
        name: 'Presente Amizade - Modelo ' + num,
        description:
          'Linda arte de amizade para sublimação em ' +
          (isShirt ? 'camisa' : 'caneca') +
          '. Modelo ' +
          num +
          '.',
        price: isShirt ? 59.9 : 35.9,
        reference_code: 'AM' + num,
        category: 'Amizade',
        image_url: 'https://img.usecurling.com/p/400/400?q=mug&color=pink&seed=' + i,
        is_customizable: true,
        type: isShirt ? 'Camisa' : 'Caneca',
      })
    }

    for (let i = 0; i < 10; i++) {
      const num = (i + 1).toString().padStart(2, '0')
      const isTile = i % 4 === 0
      seedData.push({
        name: 'Artigo Religioso - Modelo ' + num,
        description:
          'Arte religiosa para sublimação em ' +
          (isTile ? 'azulejo' : 'caneca') +
          '. Modelo ' +
          num +
          '.',
        price: isTile ? 25.9 : 35.9,
        reference_code: 'RE' + num,
        category: 'Religião',
        image_url: 'https://img.usecurling.com/p/400/400?q=dove&color=gray&seed=' + (i + 100),
        is_customizable: true,
        type: isTile ? 'Azulejo' : 'Caneca',
      })
    }

    for (const p of seedData) {
      try {
        app.findFirstRecordByData('products', 'reference_code', p.reference_code)
      } catch (_) {
        const record = new Record(productsCol)
        record.set('name', p.name)
        record.set('description', p.description)
        record.set('price', p.price)
        record.set('reference_code', p.reference_code)
        record.set('category', p.category)
        record.set('image_url', p.image_url)
        record.set('is_customizable', p.is_customizable)
        record.set('type', p.type)
        app.save(record)
      }
    }
  },
  (app) => {
    try {
      app.truncateCollection(app.findCollectionByNameOrId('products'))
    } catch (_) {}
  },
)

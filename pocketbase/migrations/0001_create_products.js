migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
    if (!usersCol.fields.getByName('role')) {
      usersCol.fields.add(
        new SelectField({
          name: 'role',
          values: ['customer', 'sublimator'],
          maxSelect: 1,
        }),
      )
      app.save(usersCol)
    }

    const products = new Collection({
      name: 'products',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'price', type: 'number', required: true, min: 0 },
        { name: 'reference_code', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        {
          name: 'image',
          type: 'file',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png'],
        },
        { name: 'image_url', type: 'text' },
        { name: 'is_customizable', type: 'bool' },
        { name: 'type', type: 'text' },
        { name: 'embedding', type: 'vector', dimensions: 1536, distance: 'cosine' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_products_category ON products (category)',
        'CREATE INDEX idx_products_ref_code ON products (reference_code)',
      ],
    })
    app.save(products)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('products'))
    } catch (_) {}
  },
)

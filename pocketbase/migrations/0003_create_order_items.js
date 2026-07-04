migrate(
  (app) => {
    const orderItems = new Collection({
      name: 'order_items',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'order',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('orders').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'product',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('products').id,
          maxSelect: 1,
        },
        { name: 'custom_text', type: 'text' },
        {
          name: 'custom_image',
          type: 'file',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png'],
        },
        { name: 'unit_price', type: 'number', required: true, min: 0 },
        { name: 'quantity', type: 'number', required: true, min: 1, onlyInt: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_order_items_order ON order_items (order)'],
    })
    app.save(orderItems)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('order_items'))
    } catch (_) {}
  },
)

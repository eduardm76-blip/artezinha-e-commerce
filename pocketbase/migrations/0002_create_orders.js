migrate(
  (app) => {
    const orders = new Collection({
      name: 'orders',
      type: 'base',
      listRule: "@request.auth.id != '' && user = @request.auth.id",
      viewRule: "@request.auth.id != '' && user = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && user = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user = @request.auth.id",
      fields: [
        {
          name: 'user',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['pending', 'paid', 'producing', 'shipped'],
          maxSelect: 1,
        },
        { name: 'total_amount', type: 'number', required: true, min: 0 },
        { name: 'shipping_cost', type: 'number', min: 0 },
        { name: 'tracking_code', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_orders_user ON orders (user)',
        'CREATE INDEX idx_orders_status ON orders (status)',
      ],
    })
    app.save(orders)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('orders'))
    } catch (_) {}
  },
)

migrate(
  (app) => {
    const cartItems = new Collection({
      name: 'cart_items',
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
          name: 'product',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('products').id,
          maxSelect: 1,
        },
        { name: 'quantity', type: 'number', required: true, min: 1, onlyInt: true },
        { name: 'custom_text', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_cart_items_user ON cart_items (user)'],
    })
    app.save(cartItems)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('cart_items'))
    } catch (_) {}
  },
)

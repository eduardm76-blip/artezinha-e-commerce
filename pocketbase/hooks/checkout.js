routerAdd(
  'POST',
  '/backend/v1/checkout',
  (e) => {
    const body = e.requestInfo().body || {}
    const userId = e.auth ? e.auth.id : ''
    if (!userId) return e.unauthorizedError('auth required')

    const items = body.items || []
    if (items.length === 0) return e.badRequestError('cart is empty')

    var subtotal = 0
    for (var i = 0; i < items.length; i++) {
      subtotal += items[i].unit_price * (items[i].quantity || 1)
    }
    var shippingCost = body.shipping_cost || 0
    var tax = Math.round(subtotal * 0.1 * 100) / 100
    var total = Math.round((subtotal + shippingCost + tax) * 100) / 100

    var ordersCol = $app.findCollectionByNameOrId('orders')
    var order = new Record(ordersCol)
    order.set('user', userId)
    order.set('status', 'paid')
    order.set('total_amount', total)
    order.set('shipping_cost', shippingCost)
    order.set('tracking_code', 'AZ' + $security.randomString(8).toUpperCase())
    $app.save(order)

    var orderItemsCol = $app.findCollectionByNameOrId('order_items')
    for (var j = 0; j < items.length; j++) {
      var orderItem = new Record(orderItemsCol)
      orderItem.set('order', order.id)
      orderItem.set('product', items[j].product_id)
      orderItem.set('custom_text', items[j].custom_text || '')
      orderItem.set('unit_price', items[j].unit_price)
      orderItem.set('quantity', items[j].quantity || 1)
      $app.save(orderItem)
    }

    return e.json(200, {
      order_id: order.id,
      tracking_code: order.getString('tracking_code'),
      total: total,
      tax: tax,
    })
  },
  $apis.requireAuth(),
)

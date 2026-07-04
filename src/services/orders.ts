import pb from '@/lib/pocketbase/client'
import type { Order } from '@/types'

export async function getUserOrders(): Promise<Order[]> {
  try {
    const records = await pb.collection('orders').getFullList({
      filter: `user = "${pb.authStore.record?.id}"`,
      sort: '-created',
    })
    return records.map((r: any) => ({
      id: r.id,
      user: r.user,
      status: r.status,
      total_amount: r.total_amount,
      shipping_cost: r.shipping_cost || 0,
      tracking_code: r.tracking_code || '',
      created: r.created,
      updated: r.updated,
    }))
  } catch {
    return []
  }
}

export async function checkout(data: {
  items: Array<{ product_id: string; unit_price: number; quantity: number; custom_text?: string }>
  shipping_cost: number
}): Promise<{ order_id: string; tracking_code: string; total: number; tax: number }> {
  return pb.send('/backend/v1/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}

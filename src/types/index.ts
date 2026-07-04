import type { Product } from '@/lib/mock-data'
export type { Product }

export interface Order {
  id: string
  user: string
  status: 'pending' | 'paid' | 'producing' | 'shipped'
  total_amount: number
  shipping_cost: number
  tracking_code: string
  created: string
  updated: string
}

export interface OrderItem {
  id: string
  order: string
  product: string
  custom_text: string
  custom_image: string
  unit_price: number
  quantity: number
  created: string
  updated: string
}

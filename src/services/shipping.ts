import pb from '@/lib/pocketbase/client'

export interface ShippingOption {
  type: 'pac' | 'sedex'
  price: number
  days: string
}

export async function calculateShippingCost(cep: string): Promise<ShippingOption[]> {
  try {
    const result = await pb.send('/backend/v1/shipping/calculate', {
      method: 'POST',
      body: JSON.stringify({ cep }),
      headers: { 'Content-Type': 'application/json' },
    })
    return result.options || []
  } catch {
    return [
      { type: 'pac' as const, price: 15.9, days: '7-10 dias úteis' },
      { type: 'sedex' as const, price: 35.9, days: '2-3 dias úteis' },
    ]
  }
}

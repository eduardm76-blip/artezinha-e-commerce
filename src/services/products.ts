import pb from '@/lib/pocketbase/client'
import type { Product } from '@/types'
import { products as mockProducts, getProduct as getMockProduct } from '@/lib/mock-data'

function mapProduct(record: any): Product {
  const image = record.image
    ? `${pb.baseURL}/api/files/products/${record.id}/${record.image}`
    : record.image_url || 'https://img.usecurling.com/p/400/400?q=mug&color=pink'
  return {
    id: record.id,
    name: record.name,
    description: record.description || '',
    price: record.price,
    reference_code: record.reference_code,
    category: record.category,
    image,
    image_url: record.image_url || '',
    is_customizable: record.is_customizable ?? false,
    type: record.type || 'Caneca',
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList({ sort: '-created' })
    return records.length > 0 ? records.map(mapProduct) : mockProducts
  } catch {
    return mockProducts
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const record = await pb.collection('products').getOne(id)
    return mapProduct(record)
  } catch {
    return getMockProduct(id) || null
  }
}

export async function semanticSearch(query: string): Promise<Product[]> {
  try {
    const result = await pb.send('/backend/v1/search/products', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' },
    })
    return (result.items || []).map((item: any) => mapProduct(item))
  } catch {
    return []
  }
}

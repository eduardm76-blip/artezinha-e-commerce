export type Product = {
  id: string
  ref: string
  name: string
  category: 'Amizade' | 'Religião'
  type: 'Caneca' | 'Camisa' | 'Azulejo'
  price: number
  image: string
}

export const products: Product[] = [
  ...Array.from({ length: 20 }).map((_, i) => {
    const num = (i + 1).toString().padStart(2, '0')
    return {
      id: `AM${num}`,
      ref: `AM${num}`,
      name: `Presente Amizade - Modelo ${num}`,
      category: 'Amizade' as const,
      type: i % 3 === 0 ? 'Camisa' : ('Caneca' as const),
      price: i % 3 === 0 ? 59.9 : 35.9,
      image: `https://img.usecurling.com/p/400/400?q=mug&color=pink&seed=${i}`,
    }
  }),
  ...Array.from({ length: 72 }).map((_, i) => {
    const num = (i + 1).toString().padStart(2, '0')
    return {
      id: `RE${num}`,
      ref: `RE${num}`,
      name: `Artigo Religioso - Modelo ${num}`,
      category: 'Religião' as const,
      type: i % 4 === 0 ? 'Azulejo' : ('Caneca' as const),
      price: i % 4 === 0 ? 25.9 : 35.9,
      image: `https://img.usecurling.com/p/400/400?q=mug&color=brown&seed=${i + 100}`,
    }
  }),
]

export const getFeatured = () => products.slice(0, 10)
export const getByCategory = (cat: string) =>
  products.filter((p) => p.category.toLowerCase() === cat.toLowerCase())
export const getProduct = (id: string) => products.find((p) => p.id === id)

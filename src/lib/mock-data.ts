export type Product = {
  id: string
  name: string
  description: string
  price: number
  reference_code: string
  category: string
  image: string
  image_url: string
  is_customizable: boolean
  type: string
}

export const products: Product[] = [
  ...Array.from({ length: 20 }).map((_, i) => {
    const num = (i + 1).toString().padStart(2, '0')
    const isShirt = i % 3 === 0
    return {
      id: `AM${num}`,
      name: `Presente Amizade - Modelo ${num}`,
      description: `Linda arte de amizade para sublimação em ${isShirt ? 'camisa' : 'caneca'}. Modelo ${num}.`,
      price: isShirt ? 59.9 : 35.9,
      reference_code: `AM${num}`,
      category: 'Amizade',
      image: `https://img.usecurling.com/p/400/400?q=mug&color=pink&seed=${i}`,
      image_url: `https://img.usecurling.com/p/400/400?q=mug&color=pink&seed=${i}`,
      is_customizable: true,
      type: isShirt ? 'Camisa' : 'Caneca',
    }
  }),
  ...Array.from({ length: 10 }).map((_, i) => {
    const num = (i + 1).toString().padStart(2, '0')
    const isTile = i % 4 === 0
    return {
      id: `RE${num}`,
      name: `Artigo Religioso - Modelo ${num}`,
      description: `Arte religiosa para sublimação em ${isTile ? 'azulejo' : 'caneca'}. Modelo ${num}.`,
      price: isTile ? 25.9 : 35.9,
      reference_code: `RE${num}`,
      category: 'Religião',
      image: `https://img.usecurling.com/p/400/400?q=dove&color=gray&seed=${i + 100}`,
      image_url: `https://img.usecurling.com/p/400/400?q=dove&color=gray&seed=${i + 100}`,
      is_customizable: true,
      type: isTile ? 'Azulejo' : 'Caneca',
    }
  }),
]

export const getFeatured = () => products.slice(0, 10)
export const getByCategory = (cat: string) =>
  products.filter((p) => p.category.toLowerCase() === cat.toLowerCase())
export const getProduct = (id: string) => products.find((p) => p.id === id)

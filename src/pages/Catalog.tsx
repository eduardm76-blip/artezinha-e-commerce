import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { products } from '@/lib/mock-data'
import { ProductCard } from '@/components/ProductCard'

export default function Catalog() {
  const { theme } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // Normalize theme from URL or default to 'todos'
  const currentTab = theme || 'todos'

  const handleTabChange = (val: string) => {
    if (val === 'todos') navigate('/catalogo')
    else navigate(`/catalogo/${val}`)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.ref.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        currentTab === 'todos' ||
        p.category.toLowerCase().replace('ã', 'a') === currentTab.toLowerCase().replace('ã', 'a')
      return matchSearch && matchFilter
    })
  }, [search, currentTab])

  return (
    <div className="container py-12 animate-fade-in min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-5xl font-script text-primary mb-2">Nosso Catálogo</h1>
          <p className="text-muted-foreground">Encontre a arte perfeita para o seu cliente.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou referência..."
            className="pl-11 rounded-full bg-muted border-none h-12 shadow-sm focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="mb-10">
        <TabsList className="bg-transparent gap-3 h-auto flex-wrap p-0">
          <TabsTrigger
            value="todos"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border data-[state=active]:border-primary px-6 h-10 shadow-sm"
          >
            Todos
          </TabsTrigger>
          <TabsTrigger
            value="amizade"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border data-[state=active]:border-primary px-6 h-10 shadow-sm"
          >
            Amizade
          </TabsTrigger>
          <TabsTrigger
            value="religiao"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border data-[state=active]:border-primary px-6 h-10 shadow-sm"
          >
            Religião
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-32 text-muted-foreground border-2 border-dashed rounded-3xl">
          <p className="text-xl font-medium">Nenhum produto encontrado.</p>
          <p className="text-sm mt-2">Tente buscar por outro termo ou limpe os filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

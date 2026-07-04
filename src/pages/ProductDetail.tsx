import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Lock, Download, Truck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { getProduct } from '@/lib/mock-data'
import useCartStore from '@/stores/use-cart-store'
import useAuthStore from '@/stores/use-auth-store'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { addItem } = useCartStore()
  const { user } = useAuthStore()

  const product = getProduct(id || '')
  const [customName, setCustomName] = useState('')
  const [cep, setCep] = useState('')
  const [shipping, setShipping] = useState<number | null>(null)
  const [isCalc, setIsCalc] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return <div className="container py-20 text-center text-xl">Produto não encontrado.</div>
  }

  const isSublimator = user?.role === 'sublimator'

  const handleAddToCart = () => {
    addItem({ product, quantity: 1, customization: customName || undefined })
    toast({
      title: 'Adicionado ao carrinho!',
      description: `${product.name} foi adicionado com sucesso.`,
    })
  }

  const calculateShipping = () => {
    if (cep.length < 8) return
    setIsCalc(true)
    setTimeout(() => {
      setShipping(15.9)
      setIsCalc(false)
    }, 1000)
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-muted rounded-[3rem] overflow-hidden aspect-square border shadow-sm relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
            />
            <Badge className="absolute top-6 left-6 shadow-md text-sm px-4 py-1">
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Details & Configurator */}
        <div className="flex flex-col justify-center">
          <Badge variant="outline" className="w-fit text-primary border-primary bg-primary/5 mb-4">
            {product.ref}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-script text-foreground mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-primary mb-8">R$ {product.price.toFixed(2)}</p>

          <div className="space-y-6 bg-card border rounded-3xl p-6 md:p-8 shadow-sm mb-8">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Nome para personalização (opcional)</Label>
              <Input
                placeholder="Ex: Mariazinha"
                className="h-12 rounded-xl bg-muted/50"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Truck className="w-4 h-4" /> Calcular Frete
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="00000-000"
                  className="h-12 rounded-xl bg-muted/50"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="h-12 rounded-xl px-6"
                  onClick={calculateShipping}
                  disabled={isCalc}
                >
                  {isCalc ? '...' : 'OK'}
                </Button>
              </div>
              {shipping !== null && (
                <div className="p-3 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 text-sm animate-fade-in-up border border-green-100">
                  <CheckCircle2 className="w-4 h-4" /> Frete Expresso (2-3 dias):{' '}
                  <span className="font-bold">R$ {shipping.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {isSublimator && (
            <div className="bg-secondary/10 p-5 rounded-3xl mb-8 border border-secondary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-secondary flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Acesso Sublimador
                </p>
                <p className="text-sm text-secondary/80 mt-1">
                  Arquivos de impressão em alta resolução disponíveis.
                </p>
              </div>
              <Button
                variant="secondary"
                className="rounded-full shrink-0 shadow-sm hover:scale-105 transition-transform"
                onClick={() => window.open(product.image, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" /> Baixar Arte
              </Button>
            </div>
          )}

          <Button
            size="lg"
            className="w-full rounded-full text-xl h-16 shadow-elevation hover:scale-[1.02] transition-transform"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-3 w-6 h-6" /> Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  )
}

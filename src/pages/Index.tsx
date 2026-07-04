import { Link } from 'react-router-dom'
import { ArrowDown, Heart, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { getFeatured } from '@/lib/mock-data'
import { ProductCard } from '@/components/ProductCard'

export default function Index() {
  const featured = getFeatured()
  const categories = [
    { icon: <Heart className="w-6 h-6" />, name: 'Canecas', path: '/catalogo' },
    { icon: <Star className="w-6 h-6" />, name: 'Camisas', path: '/catalogo' },
    { icon: <Sparkles className="w-6 h-6" />, name: 'Azulejos', path: '/catalogo' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container py-6">
        <div className="relative bg-primary/5 rounded-[2rem] overflow-hidden h-[400px] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/400?q=pattern&color=pink')] opacity-10 bg-cover bg-center mix-blend-multiply" />
          <div className="relative z-10 space-y-6 max-w-2xl animate-fade-in-up">
            <Badge className="bg-white/50 text-primary hover:bg-white/80 backdrop-blur-md mb-2">
              Novo Catálogo Disponível
            </Badge>
            <h1 className="font-script text-6xl md:text-8xl text-primary drop-shadow-sm leading-tight">
              Eternize Momentos
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              Artes prontas e produtos sublimáveis para você encantar seus clientes.
            </p>
            <Button
              size="lg"
              asChild
              className="rounded-full shadow-elevation hover:-translate-y-1 transition-transform h-14 px-8 text-lg"
            >
              <Link to="/catalogo">Acessar Catálogo Completo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Catalog Shortcuts */}
      <section className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="group overflow-hidden border-none cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100/50 hover:shadow-elevation transition-all hover:-translate-y-1 relative h-64 rounded-[2rem]">
          <Link
            to="/catalogo/amizade"
            className="absolute inset-0 p-8 flex flex-col justify-center"
          >
            <h2 className="font-script text-5xl text-primary mb-2">Amizade</h2>
            <p className="text-muted-foreground max-w-[60%]">
              Celebre os laços eternos com nossa nova coleção exclusiva.
            </p>
            <div className="mt-auto">
              <Button
                variant="outline"
                className="rounded-full bg-white/50 backdrop-blur-sm border-white"
              >
                Ver Coleção
              </Button>
            </div>
          </Link>
          <img
            src="https://img.usecurling.com/p/300/300?q=friends&color=pink"
            alt="Amizade"
            className="absolute -bottom-10 -right-10 w-64 h-64 object-contain group-hover:scale-110 transition-transform duration-700 opacity-80"
          />
        </Card>

        <Card className="group overflow-hidden border-none cursor-pointer bg-gradient-to-br from-[#F5F5DC] to-[#E8E8D0] hover:shadow-elevation transition-all hover:-translate-y-1 relative h-64 rounded-[2rem]">
          <Link
            to="/catalogo/religiao"
            className="absolute inset-0 p-8 flex flex-col justify-center"
          >
            <h2 className="font-script text-5xl text-[#8D6E63] mb-2">Religião</h2>
            <p className="text-[#8D6E63]/80 max-w-[60%]">
              Artes abençoadas que trazem paz e conforto para o coração.
            </p>
            <div className="mt-auto">
              <Button
                variant="outline"
                className="rounded-full bg-white/50 backdrop-blur-sm border-white text-[#8D6E63]"
              >
                Ver Coleção
              </Button>
            </div>
          </Link>
          <img
            src="https://img.usecurling.com/p/300/300?q=dove&color=gray"
            alt="Religião"
            className="absolute -bottom-4 -right-4 w-56 h-56 object-contain group-hover:scale-110 transition-transform duration-700 opacity-60 mix-blend-multiply"
          />
        </Card>
      </section>

      {/* Featured Grid */}
      <section className="bg-muted/30 py-16 mt-8">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-12 space-y-4">
            <h2 className="text-4xl font-script text-primary">Acesse as artes abaixo</h2>
            <ArrowDown className="w-8 h-8 text-primary animate-bounce-slow" />
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {featured.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12" />
              <CarouselNext className="-right-12" />
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className}`}>
      {children}
    </span>
  )
}

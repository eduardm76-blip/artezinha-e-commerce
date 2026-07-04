import { Link } from 'react-router-dom'
import { MousePointerClick } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/mock-data'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/produto/${product.id}`} className="group block h-full">
      <Card className="border-none bg-transparent shadow-none h-full flex flex-col cursor-pointer">
        <CardContent className="p-0 relative overflow-hidden rounded-3xl bg-muted aspect-square mb-4 shadow-sm group-hover:shadow-elevation transition-all duration-500">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white font-medium flex items-center gap-2 bg-black/60 px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <MousePointerClick className="w-4 h-4" /> Ver Arte
            </span>
          </div>
          <Badge className="absolute top-3 right-3 shadow-md bg-white text-foreground hover:bg-white">
            {product.type}
          </Badge>
        </CardContent>
        <CardFooter className="p-0 flex flex-col items-start gap-1 flex-1 px-1">
          <Badge
            variant="secondary"
            className="text-[10px] bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold tracking-wider"
          >
            {product.ref}
          </Badge>
          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug mt-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-primary font-bold mt-auto pt-2 text-lg">
            R$ {product.price.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}

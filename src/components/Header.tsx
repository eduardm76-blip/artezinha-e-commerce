import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import useCartStore from '@/stores/use-cart-store'
import useAuthStore from '@/stores/use-auth-store'

export function Header() {
  const { items, setIsOpen } = useCartStore()
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="font-script text-2xl text-primary mb-6">Menu</SheetTitle>
              <nav className="flex flex-col gap-4 text-lg">
                <Link to="/">Início</Link>
                <Link to="/catalogo">Catálogo Completo</Link>
                <Link to="/catalogo/amizade">Coleção Amizade</Link>
                <Link to="/catalogo/religiao">Coleção Religião</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-script text-2xl group-hover:animate-bounce-slow shadow-elevation">
              A&Z
            </div>
            <span className="font-script text-3xl font-bold hidden sm:inline-block text-primary">
              Art & Zinha
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="/catalogo" className="hover:text-primary transition-colors">
            Catálogo Completo
          </Link>
          <Link to="/catalogo/amizade" className="hover:text-primary transition-colors">
            Amizade
          </Link>
          <Link to="/catalogo/religiao" className="hover:text-primary transition-colors">
            Religião
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/catalogo">
              <Search className="h-5 w-5 text-muted-foreground" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to={user ? '/dashboard' : '/login'}>
              <User className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center animate-fade-in-up">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}

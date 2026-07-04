import { Heart, Instagram, Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-muted/50 pt-16 pb-8 border-t mt-auto">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-script text-xl shadow-elevation">
              A&Z
            </div>
            <span className="font-script text-2xl font-bold text-primary">
              Art & Zinha Personalizados
            </span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
            Especialistas em eternizar momentos através da sublimação. Produtos feitos com amor,
            dedicação e a mais alta qualidade para encantar seus clientes.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:text-primary transition-colors shadow-sm"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:text-primary transition-colors shadow-sm"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-foreground">Acesso Rápido</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/catalogo" className="hover:text-primary transition-colors">
              Todos os Produtos
            </Link>
            <Link to="/catalogo/amizade" className="hover:text-primary transition-colors">
              Catálogo Amizade
            </Link>
            <Link to="/catalogo/religiao" className="hover:text-primary transition-colors">
              Catálogo Religião
            </Link>
            <Link
              to="/login"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              Área do Sublimador
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-foreground">Contato</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>simoneantunes1581@gmail.com</p>
            <p>WhatsApp: (11) 99999-9999</p>
            <p className="mt-4 font-medium text-xs">CNPJ: 00.000.000/0000-00</p>
          </div>
        </div>
      </div>

      <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-1">
          Desenvolvido com <Heart className="w-4 h-4 text-primary fill-primary" /> por Skip
        </p>
        <p className="text-xs opacity-60">© 2026 Art & Zinha. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

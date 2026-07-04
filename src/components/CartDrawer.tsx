import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import useCartStore from '@/stores/use-cart-store'

export function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem } = useCartStore()
  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-background/95 backdrop-blur-md border-l-0 shadow-2xl">
        <SheetHeader>
          <SheetTitle className="font-script text-4xl text-primary flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" /> Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6 space-y-4 pr-2 -mr-2">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 animate-fade-in-up">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 opacity-50" />
              </div>
              <p className="text-lg">Seu carrinho está vazio.</p>
              <Button variant="outline" className="rounded-full" onClick={() => setIsOpen(false)}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-4 bg-card p-3 rounded-2xl border shadow-sm group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-muted"
                />
                <div className="flex-1 flex flex-col justify-center overflow-hidden">
                  <h4 className="font-semibold leading-tight text-sm truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">Qtd: {item.quantity}</p>
                  {item.customization && (
                    <p className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md mt-1 w-fit truncate max-w-full">
                      Personalização: {item.customization}
                    </p>
                  )}
                  <p className="text-primary font-bold mt-auto text-sm">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-4 sm:flex-col pt-6 border-t mt-auto">
            <div className="flex justify-between items-center w-full mb-2">
              <span className="font-medium text-muted-foreground text-lg">Total</span>
              <span className="font-bold text-2xl text-foreground">R$ {total.toFixed(2)}</span>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full rounded-full shadow-elevation text-lg h-14 group"
            >
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                Finalizar Compra{' '}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

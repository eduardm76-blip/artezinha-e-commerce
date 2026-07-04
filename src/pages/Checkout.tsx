import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MapPin, Truck, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import useCartStore from '@/stores/use-cart-store'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [shippingType, setShippingType] = useState<'pac' | 'sedex' | null>(null)
  const { items, clear } = useCartStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shippingCost = shippingType === 'sedex' ? 35.9 : shippingType === 'pac' ? 15.9 : 0

  if (items.length === 0 && step === 1) {
    return (
      <div className="container py-32 text-center flex flex-col items-center justify-center animate-fade-in">
        <CheckCircle2 className="w-20 h-20 text-muted mb-6" />
        <h2 className="text-3xl font-script text-primary mb-4">Seu carrinho está vazio.</h2>
        <Button asChild rounded-full size="lg">
          <Link to="/catalogo">Ir para o Catálogo</Link>
        </Button>
      </div>
    )
  }

  const handleFinish = () => {
    toast({
      title: 'Pedido confirmado com sucesso! 🎉',
      description: 'Você receberá os detalhes no seu email em instantes.',
    })
    clear()
    navigate('/dashboard')
  }

  const steps = [
    { num: 1, label: 'Endereço', icon: <MapPin className="w-4 h-4" /> },
    { num: 2, label: 'Frete', icon: <Truck className="w-4 h-4" /> },
    { num: 3, label: 'Pagamento', icon: <CreditCard className="w-4 h-4" /> },
  ]

  return (
    <div className="container max-w-4xl py-12 animate-fade-in min-h-[70vh]">
      <h1 className="text-4xl font-script text-primary mb-10 text-center">Finalizar Compra</h1>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 -z-10" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />

        <div className="flex justify-between w-full">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300 ${step >= s.num ? 'bg-primary text-white scale-110' : 'bg-background text-muted-foreground border-2'}`}
              >
                {step > s.num ? <CheckCircle2 className="w-6 h-6" /> : s.icon}
              </div>
              <span
                className={`text-sm font-semibold ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-sm border rounded-3xl overflow-hidden p-6 md:p-8">
            <CardContent className="p-0">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4">Onde vamos entregar?</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>CEP</Label>
                      <Input placeholder="00000-000" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Número</Label>
                      <Input placeholder="123" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Endereço Completo</Label>
                    <Input
                      placeholder="Rua das Flores, Bairro Jardim"
                      className="h-12 rounded-xl bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Complemento (opcional)</Label>
                    <Input placeholder="Apto 12" className="h-12 rounded-xl bg-muted/50" />
                  </div>

                  <Button
                    className="w-full mt-8 rounded-full h-14 text-lg shadow-elevation group"
                    onClick={() => setStep(2)}
                  >
                    Continuar para Frete{' '}
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4">Escolha o envio</h3>
                  <div
                    className={`p-5 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${shippingType === 'pac' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setShippingType('pac')}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${shippingType === 'pac' ? 'border-primary' : ''}`}
                      >
                        {shippingType === 'pac' && (
                          <div className="w-3 h-3 bg-primary rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-lg">PAC</p>
                        <p className="text-sm text-muted-foreground">Entrega em até 7 dias úteis</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">R$ 15,90</p>
                  </div>

                  <div
                    className={`p-5 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${shippingType === 'sedex' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setShippingType('sedex')}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${shippingType === 'sedex' ? 'border-primary' : ''}`}
                      >
                        {shippingType === 'sedex' && (
                          <div className="w-3 h-3 bg-primary rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-primary">SEDEX</p>
                        <p className="text-sm text-muted-foreground">Entrega em até 2 dias úteis</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg text-primary">R$ 35,90</p>
                  </div>

                  <div className="flex gap-4 mt-8 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full h-14"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button
                      className="flex-1 rounded-full h-14 shadow-elevation group"
                      onClick={() => setStep(3)}
                      disabled={!shippingType}
                    >
                      Ir para Pagamento{' '}
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4">Dados do Cartão</h3>
                  <div className="space-y-2">
                    <Label>Número do Cartão</Label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      className="h-12 rounded-xl bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome Impresso no Cartão</Label>
                    <Input placeholder="MARIA DA SILVA" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Validade</Label>
                      <Input placeholder="MM/AA" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full h-14"
                      onClick={() => setStep(2)}
                    >
                      Voltar
                    </Button>
                    <Button
                      className="flex-[2] rounded-full text-lg h-14 shadow-elevation bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleFinish}
                    >
                      Confirmar e Pagar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumo Lateral */}
        <div className="lg:col-span-1">
          <Card className="bg-muted/30 border-none rounded-3xl sticky top-24">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-6">Resumo do Pedido</h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate pr-4 text-muted-foreground">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <p className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span> <span>R$ {total.toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-muted-foreground">
                  <span>Frete:</span>{' '}
                  <span>{shippingCost ? `R$ ${shippingCost.toFixed(2)}` : 'A calcular'}</span>
                </p>
                <Separator className="my-4" />
                <p className="flex justify-between font-bold text-2xl text-primary">
                  <span>Total:</span> <span>R$ {(total + shippingCost).toFixed(2)}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

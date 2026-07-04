import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import useAuthStore from '@/stores/use-auth-store'

export default function TwoFactor() {
  const [value, setValue] = useState('')
  const { verify2FA, requires2FA } = useAuthStore()
  const navigate = useNavigate()

  // Redirect if accessed directly without login intent
  if (!requires2FA) {
    navigate('/login')
    return null
  }

  const handleVerify = () => {
    if (value.length === 6) {
      verify2FA(value)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md shadow-elevation border-none rounded-[2rem] overflow-hidden text-center">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
        <CardHeader className="pt-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-script text-primary mb-2">
            Verificação em 2 Etapas
          </CardTitle>
          <CardDescription className="text-base px-4">
            Para sua segurança, enviamos um código de 6 dígitos para o seu e-mail cadastrado.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8 p-8 pt-4">
          <InputOTP maxLength={6} value={value} onChange={setValue} className="gap-2">
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-12 h-14 text-xl rounded-xl border-2 shadow-sm data-[state=active]:border-primary data-[state=active]:ring-primary"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            className="w-full h-12 rounded-full text-lg shadow-md"
            onClick={handleVerify}
            disabled={value.length !== 6}
          >
            Confirmar e Entrar
          </Button>

          <p className="text-sm text-muted-foreground mt-2">
            Não recebeu?{' '}
            <button className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer">
              Reenviar código
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

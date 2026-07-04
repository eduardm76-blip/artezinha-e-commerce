import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuthStore from '@/stores/use-auth-store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && pass) {
      login(email)
      navigate('/2fa')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md shadow-elevation border-none rounded-[2rem] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-4xl font-script text-primary mb-2">
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className="text-base">
            Acesse sua conta para ver suas artes exclusivas e histórico.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label>E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus-visible:ring-primary"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Senha</Label>
                <Link to="#" className="text-xs text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  required
                  className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus-visible:ring-primary"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-full text-lg shadow-md mt-4"
            >
              Entrar
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Ainda não tem conta?{' '}
              <Link to="#" className="text-primary font-semibold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

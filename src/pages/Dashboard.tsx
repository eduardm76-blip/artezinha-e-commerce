import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, MapPin, ShieldCheck, LogOut, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import useAuthStore from '@/stores/use-auth-store'

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="container py-12 max-w-6xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-card p-6 rounded-3xl border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-script text-primary">Minha Conta</h1>
            <p className="text-muted-foreground font-medium">
              Olá, {user.name} <span className="opacity-50">({user.email})</span>
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="rounded-full shadow-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sair da Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-none shadow-sm bg-primary/5 hover:-translate-y-1 transition-transform">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Total de Pedidos
              </p>
              <p className="text-3xl font-bold mt-1">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-secondary/5 hover:-translate-y-1 transition-transform">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Tipo de Conta
              </p>
              <p className="text-2xl font-bold mt-1 capitalize text-secondary">{user.role}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-amber-50 hover:-translate-y-1 transition-transform">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 bg-amber-100 rounded-2xl text-amber-600">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Endereços Salvos
              </p>
              <p className="text-3xl font-bold mt-1 text-amber-700">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border rounded-3xl overflow-hidden">
        <CardHeader className="border-b bg-muted/30 px-8 py-6">
          <CardTitle className="text-xl">Histórico de Compras</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-8 py-4">Nº Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4].map((i) => (
                <TableRow key={i} className="group hover:bg-muted/50 cursor-pointer">
                  <TableCell className="font-semibold px-8 py-4 text-primary">
                    #AZ-{1000 + i}
                  </TableCell>
                  <TableCell className="text-muted-foreground">0{i}/07/2026</TableCell>
                  <TableCell>
                    <Badge
                      variant={i === 1 ? 'default' : 'secondary'}
                      className={i === 1 ? 'shadow-sm' : ''}
                    >
                      {i === 1 ? 'Em Produção' : 'Entregue'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {(150.5 * i).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group-hover:bg-primary group-hover:text-white transition-colors rounded-full"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

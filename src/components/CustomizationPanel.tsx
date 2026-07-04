import { Upload, Type, Eye } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface Props {
  customText: string
  onCustomTextChange: (text: string) => void
  customImage: string | null
  onImageUpload: (file: File | null) => void
  productImage: string
  productName: string
}

export function CustomizationPanel({
  customText,
  onCustomTextChange,
  customImage,
  onImageUpload,
  productImage,
  productName,
}: Props) {
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      onImageUpload(null)
      return
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast({
        title: 'Formato inválido',
        description: 'Apenas JPG e PNG são aceitos.',
        variant: 'destructive',
      })
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => onImageUpload(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6 bg-card border rounded-3xl p-6 md:p-8 shadow-sm mb-8">
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Upload className="w-4 h-4" /> Enviar sua imagem (JPG, PNG)
        </Label>
        <Input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="h-12 rounded-xl bg-muted/50"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Type className="w-4 h-4" /> Frase personalizada (máx. 50 caracteres)
        </Label>
        <Textarea
          maxLength={50}
          placeholder="Ex: Para minha melhor amiga!"
          className="rounded-xl bg-muted/50 resize-none"
          value={customText}
          onChange={(e) => onCustomTextChange(e.target.value)}
          rows={2}
        />
        <p className="text-xs text-muted-foreground text-right">{customText.length}/50</p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Eye className="w-4 h-4" /> Pré-visualização
        </Label>
        <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square max-w-xs mx-auto shadow-sm">
          <img
            src={customImage || productImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
          {customText && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <p className="text-white text-xl font-bold text-center px-4 drop-shadow-lg">
                {customText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

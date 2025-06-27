import { Button } from '@/components/ui/button.jsx'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+CjwvZz4KPC9nPgo8L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-6">
            <div className="text-6xl mb-4">🍺</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Bar Valhala
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 font-light">
              As melhores bebidas na palma da sua mão
            </p>
          </div>

          {/* Description */}
          <div className="mb-8 max-w-2xl mx-auto">
            <p className="text-lg text-amber-100 leading-relaxed">
              Descubra nossa seleção especial de cervejas artesanais, coquetéis exclusivos, 
              destilados premium e petiscos irresistíveis. Peça online e receba no conforto 
              da sua casa ou retire no balcão.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-white text-amber-900 hover:bg-amber-50 font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Ver Produtos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-900 font-semibold px-8 py-3 text-lg transition-all duration-300"
            >
              Sobre Nós
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-amber-200 text-sm">
                Entregamos em até 30 minutos na região
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-lg mb-2">Qualidade Premium</h3>
              <p className="text-amber-200 text-sm">
                Produtos selecionados e de alta qualidade
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-lg mb-2">Pagamento Fácil</h3>
              <p className="text-amber-200 text-sm">
                Pague online ou na entrega
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <Button
              variant="ghost"
              onClick={scrollToProducts}
              className="text-white hover:text-amber-200 p-2"
            >
              <ChevronDown className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🍺</div>
              <h3 className="text-xl font-bold">Bar Valhala</h3>
            </div>
            <p className="text-amber-200 mb-4 max-w-md">
              Há mais de 20 anos servindo as melhores bebidas da região. 
              Tradição, qualidade e atendimento excepcional em cada pedido.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-200" />
                <span className="text-sm">Rua das Bebidas, 123<br />Centro - São Paulo/SP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-200" />
                <span className="text-sm">(11) 9999-8888</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-200" />
                <span className="text-sm">contato@bardoze.com</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-200" />
                <div className="text-sm">
                  <p>Seg - Qui: 17h às 01h</p>
                  <p>Sex - Sáb: 17h às 02h</p>
                  <p>Dom: 17h às 00h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-700 mt-8 pt-8 text-center">
          <p className="text-amber-200 text-sm">
            © 2024 Bar Valhala. Todos os direitos reservados. | 
            <span className="ml-1">Beba com moderação.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}


import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useState } from 'react'

export default function Header({ cartItemsCount, onCartClick, onMenuClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (onMenuClick) onMenuClick()
  }

  return (
    <header className="bg-amber-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">🍺</div>
            <h1 className="text-xl font-bold">Bar Valhala</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#produtos" className="hover:text-amber-200 transition-colors">
              Produtos
            </a>
            <a href="#sobre" className="hover:text-amber-200 transition-colors">
              Sobre
            </a>
            <a href="#contato" className="hover:text-amber-200 transition-colors">
              Contato
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative bg-transparent border-white text-white hover:bg-white hover:text-amber-900"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden bg-transparent border-white text-white hover:bg-white hover:text-amber-900"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-amber-700">
            <div className="flex flex-col space-y-2">
              <a
                href="#produtos"
                className="py-2 hover:text-amber-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </a>
              <a
                href="#sobre"
                className="py-2 hover:text-amber-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <a
                href="#contato"
                className="py-2 hover:text-amber-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}


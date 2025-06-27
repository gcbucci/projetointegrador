import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setQuantity(1) // Reset quantity after adding to cart
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {product.category}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-amber-600">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Estoque: {product.stock}
          </span>
        </div>

        {product.stock > 0 ? (
          <div className="space-y-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 transition-colors"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full">
            Fora de Estoque
          </Button>
        )}
      </CardContent>
    </Card>
  )
}


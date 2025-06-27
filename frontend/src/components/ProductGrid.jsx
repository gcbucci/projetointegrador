import ProductCard from './ProductCard.jsx'
import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'

export default function ProductGrid({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
  // Get unique categories
  const categories = ['Todos', ...new Set(products.map(product => product.category))]
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <section id="produtos" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Nossos Produtos
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'border-amber-600 text-amber-600 hover:bg-amber-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}


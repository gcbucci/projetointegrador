import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/products')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data)
      } else {
        setError('Erro ao carregar produtos')
      }
    } catch (err) {
      setError('Erro de conexão com o servidor')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })
    
    // Show success message (you could add a toast notification here)
    console.log(`Adicionado ${quantity}x ${product.name} ao carrinho`)
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        customerInfo: {
          // This would normally come from a form
          name: 'Cliente Teste',
          phone: '(11) 99999-9999'
        }
      }

      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()
      
      if (result.success) {
        alert(`Pedido realizado com sucesso! ID: ${result.data.id}`)
        setCartItems([]) // Clear cart
        setIsCartOpen(false)
        // Refresh products to update stock
        fetchProducts()
      } else {
        alert(`Erro ao realizar pedido: ${result.message}`)
      }
    } catch (err) {
      alert('Erro de conexão ao realizar pedido')
      console.error('Error creating order:', err)
    }
  }

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🍺</div>
          <p className="text-lg text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-lg text-red-600">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        <ProductGrid 
          products={products}
          onAddToCart={addToCart}
        />
      </main>
      
      <Footer />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default App


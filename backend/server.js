const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dados em memória (simulando um banco de dados)
let products = [
  {
    id: '1',
    name: 'Cerveja Artesanal IPA',
    description: 'Cerveja artesanal com lúpulo especial, sabor marcante e aroma cítrico.',
    price: 12.50,
    category: 'Cervejas',
    image: 'https://via.placeholder.com/300x300/FFD700/000000?text=Cerveja+IPA',
    stock: 50
  },
  {
    id: '2',
    name: 'Caipirinha Tradicional',
    description: 'Caipirinha feita com cachaça premium, limão fresco e açúcar.',
    price: 8.00,
    category: 'Coquetéis',
    image: 'https://via.placeholder.com/300x300/32CD32/000000?text=Caipirinha',
    stock: 30
  },
  {
    id: '3',
    name: 'Whisky Nacional',
    description: 'Whisky nacional envelhecido, sabor suave e encorpado.',
    price: 15.00,
    category: 'Destilados',
    image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Whisky',
    stock: 25
  },
  {
    id: '4',
    name: 'Petisco de Batata',
    description: 'Porção de batata frita crocante com temperos especiais.',
    price: 6.50,
    category: 'Petiscos',
    image: 'https://via.placeholder.com/300x300/FFA500/000000?text=Batata+Frita',
    stock: 40
  },
  {
    id: '5',
    name: 'Mojito',
    description: 'Coquetel refrescante com rum, hortelã, limão e água com gás.',
    price: 10.00,
    category: 'Coquetéis',
    image: 'https://via.placeholder.com/300x300/00FF7F/000000?text=Mojito',
    stock: 35
  }
];

let orders = [];

// Rotas da API

// GET /api/products - Listar todos os produtos
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products
  });
});

// GET /api/products/:id - Obter um produto específico
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// POST /api/products - Criar um novo produto
app.post('/api/products', (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Nome e preço são obrigatórios'
    });
  }
  
  const newProduct = {
    id: uuidv4(),
    name,
    description: description || '',
    price: parseFloat(price),
    category: category || 'Outros',
    image: image || 'https://via.placeholder.com/300x300/CCCCCC/000000?text=Produto',
    stock: parseInt(stock) || 0
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    data: newProduct
  });
});

// PUT /api/products/:id - Atualizar um produto
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, stock } = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    description: description || products[productIndex].description,
    price: price ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    image: image || products[productIndex].image,
    stock: stock !== undefined ? parseInt(stock) : products[productIndex].stock
  };
  
  res.json({
    success: true,
    data: products[productIndex]
  });
});

// DELETE /api/products/:id - Deletar um produto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  products.splice(productIndex, 1);
  
  res.json({
    success: true,
    message: 'Produto deletado com sucesso'
  });
});

// POST /api/orders - Criar um novo pedido
app.post('/api/orders', (req, res) => {
  const { items, customerInfo } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Itens do pedido são obrigatórios'
    });
  }
  
  // Validar se todos os produtos existem e têm estoque
  let totalAmount = 0;
  const orderItems = [];
  
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Produto com ID ${item.productId} não encontrado`
      });
    }
    
    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Estoque insuficiente para o produto ${product.name}`
      });
    }
    
    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;
    
    orderItems.push({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: itemTotal
    });
  }
  
  const newOrder = {
    id: uuidv4(),
    items: orderItems,
    totalAmount: totalAmount,
    customerInfo: customerInfo || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // Atualizar estoque dos produtos
  for (const item of items) {
    const productIndex = products.findIndex(p => p.id === item.productId);
    products[productIndex].stock -= item.quantity;
  }
  
  orders.push(newOrder);
  
  res.status(201).json({
    success: true,
    data: newOrder
  });
});

// GET /api/orders - Listar todos os pedidos
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    data: orders
  });
});

// GET /api/orders/:id - Obter um pedido específico
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Pedido não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: order
  });
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API do Bar E-commerce funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/api`);
});

module.exports = app;


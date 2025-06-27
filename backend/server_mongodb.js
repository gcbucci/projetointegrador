require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para tratamento de erros
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware de validação de ID do MongoDB
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id && !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido'
    });
  }
  next();
};

// ROTAS DE PRODUTOS

// GET /api/products - Listar todos os produtos
app.get('/api/products', asyncHandler(async (req, res) => {
  const { category, available } = req.query;
  
  let filter = { isActive: true };
  
  if (category && category !== 'Todos') {
    filter.category = category;
  }
  
  if (available === 'true') {
    filter.stock = { $gt: 0 };
  }
  
  const products = await Product.find(filter).sort({ createdAt: -1 });
  
  res.json({
    success: true,
    data: products,
    count: products.length
  });
}));

// GET /api/products/:id - Obter um produto específico
app.get('/api/products/:id', validateObjectId, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
}));

// POST /api/products - Criar um novo produto
app.post('/api/products', asyncHandler(async (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  
  // Validação básica
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Nome e preço são obrigatórios'
    });
  }
  
  const productData = {
    name,
    description: description || '',
    price: parseFloat(price),
    category: category || 'Outros',
    image: image || 'https://via.placeholder.com/300x300/CCCCCC/000000?text=Produto',
    stock: parseInt(stock) || 0
  };
  
  const product = new Product(productData);
  await product.save();
  
  res.status(201).json({
    success: true,
    data: product
  });
}));

// PUT /api/products/:id - Atualizar um produto
app.put('/api/products/:id', validateObjectId, asyncHandler(async (req, res) => {
  const { name, description, price, category, image, stock, isActive } = req.body;
  
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  // Atualizar campos fornecidos
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = parseFloat(price);
  if (category !== undefined) product.category = category;
  if (image !== undefined) product.image = image;
  if (stock !== undefined) product.stock = parseInt(stock);
  if (isActive !== undefined) product.isActive = isActive;
  
  await product.save();
  
  res.json({
    success: true,
    data: product
  });
}));

// DELETE /api/products/:id - Deletar um produto (soft delete)
app.delete('/api/products/:id', validateObjectId, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  // Soft delete - apenas marca como inativo
  product.isActive = false;
  await product.save();
  
  res.json({
    success: true,
    message: 'Produto removido com sucesso'
  });
}));

// ROTAS DE PEDIDOS

// GET /api/orders - Listar todos os pedidos
app.get('/api/orders', asyncHandler(async (req, res) => {
  const { status, today } = req.query;
  
  let query = Order.find();
  
  if (status) {
    query = query.where('status').equals(status);
  }
  
  if (today === 'true') {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    query = query.where('createdAt').gte(startOfDay).lte(endOfDay);
  }
  
  const orders = await query
    .populate('items.product', 'name category')
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    data: orders,
    count: orders.length
  });
}));

// GET /api/orders/:id - Obter um pedido específico
app.get('/api/orders/:id', validateObjectId, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('items.product', 'name category image');
  
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
}));

// POST /api/orders - Criar um novo pedido
app.post('/api/orders', asyncHandler(async (req, res) => {
  const { items, customerInfo, deliveryType, paymentMethod, notes } = req.body;
  
  // Validação básica
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Itens do pedido são obrigatórios'
    });
  }
  
  if (!customerInfo || !customerInfo.name || !customerInfo.phone) {
    return res.status(400).json({
      success: false,
      message: 'Nome e telefone do cliente são obrigatórios'
    });
  }
  
  // Validar e processar itens do pedido
  const orderItems = [];
  let totalAmount = 0;
  
  for (const item of items) {
    const product = await Product.findById(item.productId);
    
    if (!product || !product.isActive) {
      return res.status(400).json({
        success: false,
        message: `Produto com ID ${item.productId} não encontrado`
      });
    }
    
    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Estoque insuficiente para o produto ${product.name}. Disponível: ${product.stock}`
      });
    }
    
    const subtotal = product.price * item.quantity;
    totalAmount += subtotal;
    
    orderItems.push({
      product: product._id,
      productName: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: subtotal
    });
    
    // Reduzir estoque
    product.stock -= item.quantity;
    await product.save();
  }
  
  // Criar pedido
  const orderData = {
    items: orderItems,
    totalAmount,
    customerInfo,
    deliveryType: deliveryType || 'pickup',
    paymentMethod: paymentMethod || 'cash',
    notes: notes || ''
  };
  
  const order = new Order(orderData);
  await order.save();
  
  // Popular dados do produto para resposta
  await order.populate('items.product', 'name category image');
  
  res.status(201).json({
    success: true,
    data: order
  });
}));

// PUT /api/orders/:id/status - Atualizar status do pedido
app.put('/api/orders/:id/status', validateObjectId, asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status é obrigatório'
    });
  }
  
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Pedido não encontrado'
    });
  }
  
  if (!order.updateStatus(status)) {
    return res.status(400).json({
      success: false,
      message: `Não é possível alterar status de ${order.status} para ${status}`
    });
  }
  
  await order.save();
  
  res.json({
    success: true,
    data: order
  });
}));

// ROTAS DE ESTATÍSTICAS

// GET /api/stats - Estatísticas gerais
app.get('/api/stats', asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments({ isActive: true });
  const totalOrders = await Order.countDocuments();
  const todayOrders = await Order.countDocuments({
    createdAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lt: new Date(new Date().setHours(23, 59, 59, 999))
    }
  });
  
  const lowStockProducts = await Product.find({
    isActive: true,
    stock: { $lt: 10 }
  }).select('name stock');
  
  res.json({
    success: true,
    data: {
      totalProducts,
      totalOrders,
      todayOrders,
      lowStockProducts
    }
  });
}));

// ROTAS UTILITÁRIAS

// GET /api/health - Verificar status da API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API do Bar Valhala E-commerce funcionando com MongoDB!',
    timestamp: new Date().toISOString(),
    database: 'MongoDB conectado'
  });
});

// GET /api/categories - Listar categorias disponíveis
app.get('/api/categories', asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category', { isActive: true });
  
  res.json({
    success: true,
    data: categories
  });
}));

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Middleware para tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  
  // Erro de validação do Mongoose
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors
    });
  }
  
  // Erro de duplicação (chave única)
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Dados duplicados'
    });
  }
  
  // Erro de cast (ID inválido)
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID inválido'
    });
  }
  
  // Erro genérico
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/api`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});

module.exports = app;


const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Nome do cliente é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome não pode exceder 100 caracteres']
    },
    phone: {
      type: String,
      required: [true, 'Telefone do cliente é obrigatório'],
      validate: {
        validator: function(v) {
          return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(v);
        },
        message: 'Telefone deve estar no formato (XX) XXXXX-XXXX'
      }
    },
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Email deve ter um formato válido'
      }
    },
    address: {
      street: String,
      number: String,
      complement: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
      message: 'Status deve ser: pending, confirmed, preparing, ready, delivered ou cancelled'
    },
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'pix', 'online'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  deliveryType: {
    type: String,
    enum: ['pickup', 'delivery'],
    default: 'pickup'
  },
  notes: {
    type: String,
    maxlength: [500, 'Observações não podem exceder 500 caracteres']
  }
}, {
  timestamps: true
});

// Índices para melhor performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'customerInfo.phone': 1 });

// Middleware para gerar número do pedido antes de salvar
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `BAR${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Middleware para calcular o total automaticamente
orderSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce((total, item) => {
      item.subtotal = item.price * item.quantity;
      return total + item.subtotal;
    }, 0);
    // Arredondar para 2 casas decimais
    this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  }
  next();
});

// Método para atualizar status do pedido
orderSchema.methods.updateStatus = function(newStatus) {
  const validTransitions = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['preparing', 'cancelled'],
    'preparing': ['ready', 'cancelled'],
    'ready': ['delivered'],
    'delivered': [],
    'cancelled': []
  };

  if (validTransitions[this.status].includes(newStatus)) {
    this.status = newStatus;
    return true;
  }
  return false;
};

// Método para calcular tempo estimado de preparo
orderSchema.methods.getEstimatedTime = function() {
  const baseTime = 15; // 15 minutos base
  const itemTime = this.items.reduce((time, item) => {
    const categoryTimes = {
      'Cervejas': 2,
      'Coquetéis': 5,
      'Destilados': 1,
      'Petiscos': 10
    };
    return time + (categoryTimes[item.category] || 3) * item.quantity;
  }, 0);
  
  return baseTime + itemTime;
};

// Método estático para buscar pedidos por status
orderSchema.statics.findByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Método estático para buscar pedidos do dia
orderSchema.statics.findToday = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return this.find({
    createdAt: {
      $gte: today,
      $lt: tomorrow
    }
  }).sort({ createdAt: -1 });
};

module.exports = mongoose.model('Order', orderSchema);


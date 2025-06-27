const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome do produto não pode exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Descrição do produto é obrigatória'],
    maxlength: [500, 'Descrição não pode exceder 500 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'Preço do produto é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  category: {
    type: String,
    required: [true, 'Categoria do produto é obrigatória'],
    enum: {
      values: ['Cervejas', 'Coquetéis', 'Destilados', 'Petiscos', 'Outros'],
      message: 'Categoria deve ser: Cervejas, Coquetéis, Destilados, Petiscos ou Outros'
    }
  },
  image: {
    type: String,
    required: [true, 'URL da imagem é obrigatória'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: 'URL da imagem deve ser válida e terminar com .jpg, .jpeg, .png, .webp ou .gif'
    }
  },
  stock: {
    type: Number,
    required: [true, 'Quantidade em estoque é obrigatória'],
    min: [0, 'Estoque não pode ser negativo'],
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Índices para melhor performance
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Middleware para garantir que o preço tenha no máximo 2 casas decimais
productSchema.pre('save', function(next) {
  if (this.price) {
    this.price = Math.round(this.price * 100) / 100;
  }
  next();
});

// Método para verificar se o produto está disponível
productSchema.methods.isAvailable = function() {
  return this.isActive && this.stock > 0;
};

// Método para reduzir estoque
productSchema.methods.reduceStock = function(quantity) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    return true;
  }
  return false;
};

// Método estático para buscar produtos por categoria
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true });
};

// Método estático para buscar produtos disponíveis
productSchema.statics.findAvailable = function() {
  return this.find({ isActive: true, stock: { $gt: 0 } });
};

module.exports = mongoose.model('Product', productSchema);


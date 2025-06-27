const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const initialProducts = [
  {
    name: 'Cerveja Artesanal IPA',
    description: 'Cerveja artesanal com lúpulo especial, sabor marcante e aroma cítrico.',
    price: 12.50,
    category: 'Cervejas',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 50
  },
  {
    name: 'Caipirinha Tradicional',
    description: 'Caipirinha feita com cachaça premium, limão fresco e açúcar.',
    price: 8.00,
    category: 'Coquetéis',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 30
  },
  {
    name: 'Whisky Nacional',
    description: 'Whisky nacional envelhecido, sabor suave e encorpado.',
    price: 15.00,
    category: 'Destilados',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 25
  },
  {
    name: 'Petisco de Batata',
    description: 'Porção de batata frita crocante com temperos especiais.',
    price: 6.50,
    category: 'Petiscos',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 40
  },
  {
    name: 'Mojito',
    description: 'Coquetel refrescante com rum, hortelã, limão e água com gás.',
    price: 10.00,
    category: 'Coquetéis',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 35
  },
  {
    name: 'Cerveja Pilsen',
    description: 'Cerveja pilsen gelada, refrescante e de sabor suave.',
    price: 5.00,
    category: 'Cervejas',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 60
  },
  {
    name: 'Vodka Premium',
    description: 'Vodka premium importada, ideal para drinks sofisticados.',
    price: 18.00,
    category: 'Destilados',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 20
  },
  {
    name: 'Porção de Asas',
    description: 'Asas de frango temperadas e grelhadas, acompanha molho especial.',
    price: 12.00,
    category: 'Petiscos',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=300&fit=crop&auto=format&q=80.jpg',
    stock: 25
  }
];

const seedDatabase = async () => {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado ao MongoDB');

    // Limpar produtos existentes
    await Product.deleteMany({});
    console.log('Produtos existentes removidos');

    // Inserir produtos iniciais
    const products = await Product.insertMany(initialProducts);
    console.log(`${products.length} produtos inseridos com sucesso`);

    console.log('Produtos criados:');
    products.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - R$ ${product.price.toFixed(2)}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

// Executar apenas se chamado diretamente
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, initialProducts };


# E-commerce para Bar - Bar Valhala

Este projeto é um e-commerce básico para um bar, desenvolvido como uma Single Page Application (SPA) com front-end em React e back-end em Node.js (API RESTful). O sistema permite aos clientes visualizar produtos, adicionar itens ao carrinho e realizar pedidos online.

**🆕 NOVA VERSÃO COM MONGODB**: O projeto agora inclui integração com banco de dados MongoDB para persistência de dados de produtos, estoque e pedidos.

## 🚀 Tecnologias Utilizadas

### Front-end
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes de interface reutilizáveis
- **Lucide React** - Ícones SVG
- **Framer Motion** - Animações e transições

### Back-end
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Document Mapper) para MongoDB
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **UUID** - Geração de identificadores únicos
- **Body-parser** - Middleware para parsing de requisições
- **Dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
bar_ecommerce/
├── backend/                    # Servidor Node.js (API REST)
│   ├── config/
│   │   └── database.js        # Configuração do MongoDB
│   ├── models/
│   │   ├── Product.js         # Modelo de Produto
│   │   └── Order.js           # Modelo de Pedido
│   ├── scripts/
│   │   └── seedDatabase.js    # Script para popular o banco
│   ├── node_modules/
│   ├── .env                   # Variáveis de ambiente
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js              # Servidor com dados em memória (versão anterior)
│   └── server_mongodb.js      # Servidor com MongoDB (versão atual)
├── frontend/                  # Aplicação React (SPA)
│   └── bar-ecommerce-frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/    # Componentes React
│       │   │   ├── Header.jsx
│       │   │   ├── Hero.jsx
│       │   │   ├── ProductCard.jsx
│       │   │   ├── ProductGrid.jsx
│       │   │   ├── Cart.jsx
│       │   │   └── Footer.jsx
│       │   ├── App.jsx        # Componente principal
│       │   ├── App.css        # Estilos globais
│       │   └── main.jsx       # Ponto de entrada
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
└── README.md                  # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm
- MongoDB (local ou MongoDB Atlas)
- Git

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd bar_ecommerce
```

### 2. Configuração do MongoDB

#### Opção A: MongoDB Local (Recomendado para desenvolvimento)
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verificar se está rodando
sudo systemctl status mongod
```

#### Opção B: MongoDB Atlas (Cloud)
1. Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure o acesso de rede (adicione seu IP)
4. Crie um usuário de banco de dados
5. Obtenha a string de conexão

### 3. Configuração do Back-end
```bash
cd backend
npm install
```

### 4. Configuração das Variáveis de Ambiente
Edite o arquivo `.env` no diretório `backend/`:

```env
# Configurações do Servidor
PORT=3001
NODE_ENV=development

# Para MongoDB Local:
MONGODB_URI=mongodb://localhost:27017/bar_ecommerce

# Para MongoDB Atlas (substitua pelos seus dados):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bar_ecommerce?retryWrites=true&w=majority

# Configurações de Segurança
JWT_SECRET=seu_jwt_secret_aqui_mude_em_producao
```

### 5. Popular o Banco de Dados
```bash
cd backend
npm run seed
```

### 6. Configuração do Front-end
```bash
cd ../frontend/bar-ecommerce-frontend
pnpm install
```

## 🚀 Como Executar

### 1. Iniciar o Back-end (API com MongoDB)
```bash
cd backend
npm start
```
O servidor estará disponível em: `http://localhost:3001`

**Comandos disponíveis:**
- `npm start` - Inicia servidor com MongoDB
- `npm run start:memory` - Inicia servidor com dados em memória (versão anterior)
- `npm run dev` - Inicia servidor em modo desenvolvimento com MongoDB
- `npm run seed` - Popula o banco de dados com dados iniciais

### 2. Iniciar o Front-end (em outro terminal)
```bash
cd frontend/bar-ecommerce-frontend
pnpm run dev --host
```
A aplicação estará disponível em: `http://localhost:5173`

## 📱 Funcionalidades

### Para Clientes
- **Visualização de Produtos**: Catálogo completo com imagens, descrições e preços
- **Filtros por Categoria**: Cervejas, Coquetéis, Destilados, Petiscos
- **Carrinho de Compras**: Adicionar, remover e alterar quantidades
- **Finalização de Pedidos**: Sistema de checkout simplificado
- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Controle de Estoque**: Produtos indisponíveis quando estoque zerado

### Para Administradores (API)
- **CRUD de Produtos**: Criar, ler, atualizar e deletar produtos
- **Gestão de Pedidos**: Visualizar e gerenciar pedidos
- **Controle de Estoque**: Atualização automática do estoque
- **Validação de Dados**: Validação robusta com Mongoose
- **Estatísticas**: Endpoint para estatísticas gerais
- **Filtros Avançados**: Busca por categoria, disponibilidade, etc.

## 🔌 API Endpoints

### Produtos
- `GET /api/products` - Listar todos os produtos
  - Query params: `category`, `available`
- `GET /api/products/:id` - Obter produto específico
- `POST /api/products` - Criar novo produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto (soft delete)

### Pedidos
- `GET /api/orders` - Listar todos os pedidos
  - Query params: `status`, `today`
- `GET /api/orders/:id` - Obter pedido específico
- `POST /api/orders` - Criar novo pedido
- `PUT /api/orders/:id/status` - Atualizar status do pedido

### Estatísticas
- `GET /api/stats` - Estatísticas gerais

### Utilitários
- `GET /api/health` - Verificar status da API
- `GET /api/categories` - Listar categorias disponíveis

## 📊 Modelos de Dados

### Produto (MongoDB)
```javascript
{
  _id: ObjectId,
  name: String (obrigatório, max 100 chars),
  description: String (obrigatório, max 500 chars),
  price: Number (obrigatório, min 0),
  category: String (enum: Cervejas, Coquetéis, Destilados, Petiscos, Outros),
  image: String (URL válida),
  stock: Number (min 0, default 0),
  isActive: Boolean (default true),
  createdAt: Date,
  updatedAt: Date
}
```

### Pedido (MongoDB)
```javascript
{
  _id: ObjectId,
  orderNumber: String (único, auto-gerado),
  items: [{
    product: ObjectId (ref: Product),
    productName: String,
    price: Number,
    quantity: Number,
    subtotal: Number
  }],
  totalAmount: Number (calculado automaticamente),
  customerInfo: {
    name: String (obrigatório),
    phone: String (obrigatório, formato validado),
    email: String (opcional, formato validado),
    address: Object (opcional)
  },
  status: String (enum: pending, confirmed, preparing, ready, delivered, cancelled),
  paymentMethod: String (enum: cash, card, pix, online),
  paymentStatus: String (enum: pending, paid, failed, refunded),
  deliveryType: String (enum: pickup, delivery),
  notes: String (max 500 chars),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Design e UX

O projeto utiliza uma paleta de cores inspirada em ambientes de bar:
- **Primária**: Tons de âmbar (#D97706, #92400E)
- **Secundária**: Branco e tons de cinza
- **Acentos**: Verde para ações positivas, vermelho para remoções

### Componentes Principais
- **Header**: Navegação fixa com logo, menu e carrinho
- **Hero**: Seção de destaque com call-to-action
- **ProductGrid**: Grade responsiva de produtos com filtros
- **ProductCard**: Card individual de produto com controles
- **Cart**: Painel lateral deslizante para o carrinho
- **Footer**: Informações de contato e redes sociais

## 🔧 Desenvolvimento

### Scripts Disponíveis

#### Back-end
- `npm start` - Inicia o servidor com MongoDB em produção
- `npm run start:memory` - Inicia o servidor com dados em memória
- `npm run dev` - Inicia o servidor com MongoDB em desenvolvimento (nodemon)
- `npm run dev:memory` - Inicia o servidor com dados em memória em desenvolvimento
- `npm run seed` - Popula o banco de dados com dados iniciais

#### Front-end
- `pnpm run dev` - Inicia o servidor de desenvolvimento
- `pnpm run build` - Gera build de produção
- `pnpm run preview` - Visualiza o build de produção

### Estrutura de Componentes React

```
App.jsx (Estado global, API calls)
├── Header.jsx (Navegação, carrinho)
├── Hero.jsx (Seção principal)
├── ProductGrid.jsx (Lista de produtos)
│   └── ProductCard.jsx (Card individual)
├── Cart.jsx (Carrinho lateral)
└── Footer.jsx (Rodapé)
```

### Validações e Regras de Negócio

#### Produtos
- Nome obrigatório (máx. 100 caracteres)
- Descrição obrigatória (máx. 500 caracteres)
- Preço obrigatório (não negativo)
- Categoria deve ser uma das opções válidas
- URL da imagem deve ser válida
- Estoque não pode ser negativo

#### Pedidos
- Itens obrigatórios (pelo menos 1)
- Nome e telefone do cliente obrigatórios
- Telefone deve estar no formato (XX) XXXXX-XXXX
- Email opcional, mas deve ser válido se fornecido
- Verificação de estoque antes de criar pedido
- Cálculo automático de subtotais e total
- Geração automática de número do pedido

## 🚀 Deploy

### Opções de Deploy

1. **Vercel/Netlify** (Front-end)
2. **Heroku/Railway** (Back-end)
3. **MongoDB Atlas** (Banco de dados)
4. **Docker** (Aplicação completa)

### Variáveis de Ambiente

#### Back-end (Produção)
```env
PORT=80
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bar_ecommerce
JWT_SECRET=seu_jwt_secret_super_seguro
```

#### Front-end (Produção)
```env
VITE_API_URL=https://sua-api.herokuapp.com
```

### Configuração para Produção

1. **MongoDB Atlas**: Configure um cluster em produção
2. **Variáveis de Ambiente**: Configure todas as variáveis necessárias
3. **CORS**: Configure origens específicas para produção
4. **Logs**: Implemente sistema de logs robusto
5. **Monitoramento**: Configure alertas e métricas

## 🧪 Testes

### Testes Realizados
- ✅ Conexão com MongoDB
- ✅ Criação e validação de produtos
- ✅ Operações CRUD de produtos
- ✅ Criação de pedidos com validação
- ✅ Atualização automática de estoque
- ✅ Carregamento de produtos da API
- ✅ Adição de produtos ao carrinho
- ✅ Atualização de quantidades no carrinho
- ✅ Remoção de produtos do carrinho
- ✅ Finalização de pedidos
- ✅ Responsividade em diferentes dispositivos
- ✅ Filtros por categoria
- ✅ Navegação entre seções

### Comandos de Teste

```bash
# Testar conexão com API
curl http://localhost:3001/api/health

# Listar produtos
curl http://localhost:3001/api/products

# Criar produto
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Novo Produto", "price": 20.00, "description": "Descrição", "category": "Outros"}'

# Popular banco de dados
npm run seed
```

## 🔮 Próximos Passos

### Melhorias Futuras
- [ ] Sistema de autenticação de usuários
- [ ] Integração com gateway de pagamento
- [ ] Painel administrativo completo
- [ ] Sistema de avaliações e comentários
- [ ] Notificações push
- [ ] Integração com delivery
- [ ] Programa de fidelidade
- [ ] Chat de suporte
- [ ] Sistema de cupons e promoções
- [ ] Relatórios de vendas
- [ ] Backup automático do banco

### Otimizações Técnicas
- [ ] Implementação de cache (Redis)
- [ ] Testes automatizados (Jest, Cypress)
- [ ] CI/CD pipeline
- [ ] Monitoramento e logs avançados
- [ ] SEO e meta tags
- [ ] PWA (Progressive Web App)
- [ ] Otimização de imagens
- [ ] Compressão de dados
- [ ] Rate limiting
- [ ] Segurança avançada

## 🔒 Segurança

### Medidas Implementadas
- Validação robusta de dados com Mongoose
- Sanitização de entradas
- CORS configurado
- Variáveis de ambiente para dados sensíveis
- Soft delete para produtos
- Validação de IDs do MongoDB

### Para Produção
- Implementar autenticação JWT
- Configurar HTTPS
- Rate limiting
- Logs de segurança
- Backup regular do banco
- Monitoramento de atividades suspeitas

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e demonstrativos.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@barvalhala.com
- Telefone: (11) 9999-8888

## 🔄 Changelog

### v2.0.0 (Atual) - Integração com MongoDB
- ✅ Adicionado MongoDB como banco de dados principal
- ✅ Criados modelos Mongoose para Produtos e Pedidos
- ✅ Implementada validação robusta de dados
- ✅ Adicionado controle de estoque automático
- ✅ Criado script para popular banco de dados
- ✅ Implementadas estatísticas e relatórios básicos
- ✅ Adicionado sistema de numeração de pedidos
- ✅ Melhorada a estrutura de erros da API

### v1.0.0 - Versão Inicial
- ✅ SPA React com componentes funcionais
- ✅ API REST com dados em memória
- ✅ Sistema básico de carrinho
- ✅ Design responsivo

---

**Desenvolvido com ❤️ para o Bar Valhala**

### Atribuição do Projeto da Faculdade

Este projeto foi desenvolvido como parte do **Projeto Integrador UNIVAG** pelos alunos:
- **Flavio Tonelle**
- **Jupirany Barros**
- **Gustavo Bucci**
- **Rafael**



### Atribuição do Projeto da Faculdade

Este projeto foi desenvolvido como parte do **Projeto Integrador UNIVAG** pelos alunos:
- **Flavio Tonelle**
- **Jupirany Barros**
- **Gustavo Bucci**
- **Rafael**


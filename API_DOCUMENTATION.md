# API Documentation - Bar Valhala E-commerce

## Base URL
```
http://localhost:3001/api
```

## Authentication
Atualmente a API não requer autenticação. Em produção, recomenda-se implementar JWT tokens.

## Response Format
Todas as respostas seguem o formato padrão:

```json
{
  "success": boolean,
  "data": object|array,
  "message": string
}
```

## Error Handling
Em caso de erro, a API retorna:

```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

## Endpoints

### Health Check

#### GET /api/health
Verifica se a API está funcionando.

**Response:**
```json
{
  "success": true,
  "message": "API do Bar Valhala E-commerce funcionando!",
  "timestamp": "2024-06-25T02:30:00.000Z"
}
```

---

### Products

#### GET /api/products
Retorna lista de todos os produtos.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Cerveja Artesanal IPA",
      "description": "Cerveja artesanal com lúpulo especial, sabor marcante e aroma cítrico.",
      "price": 12.50,
      "category": "Cervejas",
      "image": "https://via.placeholder.com/300x300/FFD700/000000?text=Cerveja+IPA",
      "stock": 50
    }
  ]
}
```

#### GET /api/products/:id
Retorna um produto específico.

**Parameters:**
- `id` (string): ID do produto

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Cerveja Artesanal IPA",
    "description": "Cerveja artesanal com lúpulo especial, sabor marcante e aroma cítrico.",
    "price": 12.50,
    "category": "Cervejas",
    "image": "https://via.placeholder.com/300x300/FFD700/000000?text=Cerveja+IPA",
    "stock": 50
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Produto não encontrado"
}
```

#### POST /api/products
Cria um novo produto.

**Request Body:**
```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 10.50,
  "category": "Categoria",
  "image": "https://exemplo.com/imagem.jpg",
  "stock": 20
}
```

**Required Fields:**
- `name` (string)
- `price` (number)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-gerado",
    "name": "Nome do Produto",
    "description": "Descrição do produto",
    "price": 10.50,
    "category": "Categoria",
    "image": "https://exemplo.com/imagem.jpg",
    "stock": 20
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Nome e preço são obrigatórios"
}
```

#### PUT /api/products/:id
Atualiza um produto existente.

**Parameters:**
- `id` (string): ID do produto

**Request Body:**
```json
{
  "name": "Nome Atualizado",
  "description": "Nova descrição",
  "price": 15.00,
  "category": "Nova Categoria",
  "image": "https://exemplo.com/nova-imagem.jpg",
  "stock": 30
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Nome Atualizado",
    "description": "Nova descrição",
    "price": 15.00,
    "category": "Nova Categoria",
    "image": "https://exemplo.com/nova-imagem.jpg",
    "stock": 30
  }
}
```

#### DELETE /api/products/:id
Remove um produto.

**Parameters:**
- `id` (string): ID do produto

**Response:**
```json
{
  "success": true,
  "message": "Produto deletado com sucesso"
}
```

---

### Orders

#### GET /api/orders
Retorna lista de todos os pedidos.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-do-pedido",
      "items": [
        {
          "productId": "1",
          "productName": "Cerveja Artesanal IPA",
          "price": 12.50,
          "quantity": 2,
          "subtotal": 25.00
        }
      ],
      "totalAmount": 25.00,
      "customerInfo": {
        "name": "Cliente Teste",
        "phone": "(11) 99999-9999"
      },
      "status": "pending",
      "createdAt": "2024-06-25T02:30:00.000Z"
    }
  ]
}
```

#### GET /api/orders/:id
Retorna um pedido específico.

**Parameters:**
- `id` (string): ID do pedido

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-do-pedido",
    "items": [
      {
        "productId": "1",
        "productName": "Cerveja Artesanal IPA",
        "price": 12.50,
        "quantity": 2,
        "subtotal": 25.00
      }
    ],
    "totalAmount": 25.00,
    "customerInfo": {
      "name": "Cliente Teste",
      "phone": "(11) 99999-9999"
    },
    "status": "pending",
    "createdAt": "2024-06-25T02:30:00.000Z"
  }
}
```

#### POST /api/orders
Cria um novo pedido.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2
    },
    {
      "productId": "2",
      "quantity": 1
    }
  ],
  "customerInfo": {
    "name": "João Silva",
    "phone": "(11) 99999-9999",
    "email": "joao@email.com"
  }
}
```

**Required Fields:**
- `items` (array): Lista de itens do pedido
  - `productId` (string): ID do produto
  - `quantity` (number): Quantidade

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-gerado",
    "items": [
      {
        "productId": "1",
        "productName": "Cerveja Artesanal IPA",
        "price": 12.50,
        "quantity": 2,
        "subtotal": 25.00
      }
    ],
    "totalAmount": 25.00,
    "customerInfo": {
      "name": "João Silva",
      "phone": "(11) 99999-9999"
    },
    "status": "pending",
    "createdAt": "2024-06-25T02:30:00.000Z"
  }
}
```

**Error Responses:**

**400 - Itens obrigatórios:**
```json
{
  "success": false,
  "message": "Itens do pedido são obrigatórios"
}
```

**400 - Produto não encontrado:**
```json
{
  "success": false,
  "message": "Produto com ID {id} não encontrado"
}
```

**400 - Estoque insuficiente:**
```json
{
  "success": false,
  "message": "Estoque insuficiente para o produto {nome}"
}
```

---

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}
```

### Order
```typescript
interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  customerInfo: CustomerInfo;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
}

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface CustomerInfo {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}
```

## HTTP Status Codes

- `200` - OK: Requisição bem-sucedida
- `201` - Created: Recurso criado com sucesso
- `400` - Bad Request: Dados inválidos ou ausentes
- `404` - Not Found: Recurso não encontrado
- `500` - Internal Server Error: Erro interno do servidor

## Rate Limiting

Atualmente não há limitação de taxa implementada. Para produção, recomenda-se:
- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

## CORS

A API está configurada para aceitar requisições de qualquer origem durante desenvolvimento. Para produção, configure origens específicas:

```javascript
app.use(cors({
  origin: ['https://bardoze.com', 'https://www.bardoze.com']
}));
```

## Examples

### Criar um pedido completo

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "1", "quantity": 2},
      {"productId": "2", "quantity": 1}
    ],
    "customerInfo": {
      "name": "João Silva",
      "phone": "(11) 99999-9999"
    }
  }'
```

### Buscar todos os produtos

```bash
curl http://localhost:3001/api/products
```

### Atualizar estoque de um produto

```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"stock": 45}'
```

## Testing

Para testar a API, você pode usar:

### cURL
```bash
# Testar health check
curl http://localhost:3001/api/health

# Listar produtos
curl http://localhost:3001/api/products

# Criar produto
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Novo Produto", "price": 20.00}'
```

### Postman
Importe a seguinte collection:

```json
{
  "info": {
    "name": "Bar do Zé API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/health"
      }
    },
    {
      "name": "Get Products",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/products"
      }
    },
    {
      "name": "Create Order",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/orders",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"items\": [\n    {\"productId\": \"1\", \"quantity\": 2}\n  ],\n  \"customerInfo\": {\n    \"name\": \"Teste\",\n    \"phone\": \"(11) 99999-9999\"\n  }\n}"
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001/api"
    }
  ]
}
```

## Future Enhancements

### Autenticação
```javascript
// Headers para requisições autenticadas
{
  "Authorization": "Bearer jwt-token-here"
}
```

### Paginação
```javascript
// Query parameters para paginação
GET /api/products?page=1&limit=10&sort=name&order=asc
```

### Filtros
```javascript
// Query parameters para filtros
GET /api/products?category=Cervejas&minPrice=10&maxPrice=20
```

### Webhooks
```javascript
// Notificações para eventos importantes
POST /webhooks/order-created
POST /webhooks/stock-low
```



## Atribuição do Projeto da Faculdade

Este projeto foi desenvolvido como parte do **Projeto Integrador UNIVAG** pelos alunos:
- **Flavio Tonelle**
- **Jupirany Barros**
- **Gustavo Bucci**
- **Rafael**


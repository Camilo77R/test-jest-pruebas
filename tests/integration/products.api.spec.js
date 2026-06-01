const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../../src/api/app');
const { connectMongo, disconnectMongo } = require('../../src/api/config/mongo');
const Product = require('../../src/api/models/product.model');
jest.setTimeout(60000);

function buildProduct(overrides = {}) {
  return {
    codigo: `COD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    nombre: 'Teclado mecánico',
    precio: 250000,
    categoria: 'Tecnologia',
    stock: 12,
    ...overrides,
  };
}

describe('Ejercicio 4 - API CRUD de productos', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await connectMongo(mongoServer.getUri());
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await disconnectMongo();

    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  test('GET /api/productos retorna todos los productos', async () => {
    await Product.create(buildProduct({ codigo: 'P-100' }));
    await Product.create(buildProduct({ codigo: 'P-101' }));

    const response = await request(app).get('/api/productos');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
  });

  test('POST /api/productos crea un producto', async () => {
    const payload = buildProduct({ codigo: 'P-200' });
    const response = await request(app).post('/api/productos').send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nombre).toBe(payload.nombre);
  });

  test('GET /api/productos/:id obtiene un producto por id', async () => {
    const createdProduct = await Product.create(buildProduct({ codigo: 'P-300' }));
    const response = await request(app).get(`/api/productos/${createdProduct.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.codigo).toBe('P-300');
  });

  test('PUT /api/productos/:id actualiza un producto', async () => {
    const createdProduct = await Product.create(buildProduct({ codigo: 'P-400' }));
    const response = await request(app).put(`/api/productos/${createdProduct.id}`).send({
      nombre: 'Teclado mecánico RGB',
      precio: 275000,
      categoria: 'Tecnologia',
      stock: 20,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe('Teclado mecánico RGB');
    expect(response.body.stock).toBe(20);
  });

  test('DELETE /api/productos/:id elimina un producto', async () => {
    const createdProduct = await Product.create(buildProduct({ codigo: 'P-500' }));
    const response = await request(app).delete(`/api/productos/${createdProduct.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/eliminado/i);

    const deleted = await Product.findById(createdProduct.id);
    expect(deleted).toBeNull();
  });
});

require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('./config/mongo');

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function bootstrap() {
  try {
    await connectMongo(MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`API ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar la API:', error.message);
    process.exit(1);
  }
}

bootstrap();

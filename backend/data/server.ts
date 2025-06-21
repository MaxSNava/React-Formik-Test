import express from 'express';
import cors from 'cors';
import router from './routes.ts';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' })); // ✅ Aquí habilitas CORS
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}/api`);
});

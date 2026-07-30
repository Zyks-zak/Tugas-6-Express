import express from 'express';
import bookRoute from './routes/book.route.js'; 
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/books', bookRoute);
app.use(errorHandler as any);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

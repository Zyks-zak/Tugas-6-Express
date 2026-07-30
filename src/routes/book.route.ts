import { Router } from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controller/book.controller.js'; // <-- Ditambah "s"
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', requireAuth, createBook);
router.put('/:id', requireAuth, updateBook);
router.delete('/:id', requireAuth, deleteBook);

export default router;

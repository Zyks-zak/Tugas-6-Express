import { type Request, type Response, type NextFunction } from 'express';

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

let books: Book[] = [
    { id: 1, title: 'bumi', author: 'tere liye', year: 2012 },
    { id: 2, title: 'matahari', author: 'tere liye', year: 2014 }
];

export const getAllBooks = (req: Request, res: Response) => {
    res.status(200).json({ data: books });
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.id as string);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        const err: any = new Error('Buku tidak ditemukan');
        err.statusCode = 404;
        return next(err);
    }

    res.status(200).json({ data: book });
};

export const createBook = (req: Request, res: Response) => {
    const { title, author, year } = req.body as { title: string; author: string; year: number; };

    const newBook: Book = {
        id: books.length > 0 ? books[books.length - 1]!.id + 1 : 1,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json({ message: 'Buku berhasil ditambahkan' });
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.id as string);
    const { title, author, year } = req.body as { title: string; author: string; year: number; };

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        const err: any = new Error('buku tidak ditemukan');
        err.statusCode = 404;
        return next(err);
    }

    books[bookIndex] = { ...books[bookIndex]!, title, author, year };
    res.status(200).json({ message: 'buku berhasil diupdate', data: books[bookIndex] });
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.id as string);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        const err: any = new Error('buku tidak ditemukan');
        err.statusCode = 404;
        return next(err);
    }

    books.splice(bookIndex, 1);
    res.status(200).json({ message: 'buku berhasil dihapus' });
};

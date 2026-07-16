import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Book {
  id : number;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [
  { id: 1, title: 'mie ayam sebelum ngoding', author: 'fabian hamada',year: 2012 },
  { id: 2, title: 'seporsi mie ayam', author: 'jule arpila',year: 2016 }
];

app.get('/books', (req: Request, res: Response ) => {
  res.status(200).json({ data: books});
});

app.get('/books/:id', (req: Request, res: Response ) => {
  const bookId = parseInt (req.params.id as string);
  const book = books.find(b => b.id === bookId);

  if(!book) {
    return res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
  res.status(200).json({ data: book});
});

app.post('/books', (req: Request, res: Response ) => {
  const { title,author,year} = req.body as { title: string; author: string; year: number};

  if(!title || !author || !year) {
    return res.status(400).json({ message: 'Data tidak lengkap. title, author, dan year wajib di isi.'});
  }

  const newBook: Book = {
    id: books.length > 0 ? books[books.length - 1]!.id + 1:1,title,author,year
  };

  books.push(newBook);
  res.status(201).json({ message: 'Buku berhasil ditambahkan', data: newBook });
});

app.put('/books/:id', (req: Request, res: Response ) => {
  const bookId = parseInt(req.params.id as string);
  const { title, author, year } = req.body as {title: string; author: string; year: number};

  const bookIndex = books.findIndex(b => b.id === bookId);

  if(bookIndex === -1) {
    return res.status(404).json({ message: 'Buku tidak ditemukan' });
  }

  books[bookIndex] = {
    ...books[bookIndex]!,title: title ?? books[bookIndex]!.title,
    author: author ?? books[bookIndex]!.author,
    year: year ?? books[bookIndex]!.year
  };

  res.status(200).json({ message: 'Buku berhasil di update', data: books[bookIndex] });
});

app.delete('/books/:id', (req: Request, res: Response ) => {
  const bookId = parseInt (req.params.id as string);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if(bookIndex === -1) {
    return res.status(404).json({ message: 'Buku tidak ditemukan'});
  }

  books.splice(bookIndex, 1);
  res.status(200).json({ message: 'Buku berhasil ditemukan'});
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
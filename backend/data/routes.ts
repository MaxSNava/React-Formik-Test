import { Router, Request, Response } from 'express';
import db from './database.ts';

const router = Router();

router.get('/items', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;

  const items = db.prepare(
    'SELECT * FROM items LIMIT @limit OFFSET @offset',
  ).all({ limit, offset: startIndex});
  res.json(items);
});

router.get('/items/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  item ? res.json(item) : res.status(404).json({ message: 'Not found' });
});

router.post('/items', (req, res) => {
  const { name, description } = req.body;
  const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
  const result = stmt.run(name, description);
  res.status(201).json({ id: result.lastInsertRowid, name, description });
});


router.patch('/items/:id', (req: Request, res: Response) => {
  const { name, description }: { name?: string; description?: string } = req.body;
  const current = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  if (!current) return res.status(404).json({ message: 'Not found' });

  const updated = {
    name: name ?? current.name,
    description: description ?? current.description,
  };

  const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?');
  stmt.run(updated.name, updated.description, req.params.id);
  res.json({ id: req.params.id, ...updated });
});


router.delete('/items/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM items WHERE id = ?');
  const result = stmt.run(req.params.id);
  result.changes
    ? res.json({ message: 'Deleted' })
    : res.status(404).json({ message: 'Not found' });
});

export default router;

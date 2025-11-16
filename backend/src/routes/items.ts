import { Router } from 'express';
import Item from '../models/Item';

const router = Router();

router.get('/', async (_, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', async (req, res) => {
  const newItem = await Item.create(req.body);
  res.status(201).json(newItem);
});

router.put('/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;

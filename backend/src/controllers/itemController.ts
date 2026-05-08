import { Request, Response } from 'express';
import { fetchItemsFromDb } from '../services/itemService';

export async function getItems(req: Request, res: Response) {
  const { data, error } = await fetchItemsFromDb();

  if (error) {
    return res.status(500).json({ error });
  }

  return res.json(data)
}
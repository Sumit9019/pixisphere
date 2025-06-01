import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const dbPath = path.join(process.cwd(), 'db.json');
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const json = JSON.parse(data);
    const photographer = (json.photographers || []).find((p: any) => String(p.id) === String(id));
    if (!photographer) {
      res.status(404).json({ error: 'Photographer not found' });
      return;
    }
    res.status(200).json(photographer);
  } catch {
    res.status(500).json({ error: 'Failed to load photographer' });
  }
}

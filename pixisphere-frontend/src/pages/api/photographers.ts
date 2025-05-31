import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbPath = path.join(process.cwd(), 'db.json');
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const json = JSON.parse(data);
    res.status(200).json(json.photographers || []);
  } catch {
    res.status(500).json({ error: 'Failed to load photographers' });
  }
}

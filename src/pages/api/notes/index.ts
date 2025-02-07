import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { Note } from '@/models/Note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    await connectToDatabase();

    switch (req.method) {
      case 'GET':
        const notes = await Note.find({ userId: decoded.userId }).sort({ createdAt: -1 });
        return res.status(200).json(notes);

      case 'POST':
        const { title, content, type } = req.body;
        const newNote = await Note.create({
          userId: decoded.userId,
          title,
          content,
          type,
        });
        return res.status(201).json(newNote);

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
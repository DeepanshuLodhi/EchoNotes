import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { Note } from '@/models/Note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    await connectToDatabase();

    const note = await Note.findOne({ _id: id, userId: decoded.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    switch (req.method) {
      case 'GET':
        return res.status(200).json(note);

      case 'PUT':
        const updatedNote = await Note.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );
        return res.status(200).json(updatedNote);

      case 'DELETE':
        await Note.findByIdAndDelete(id);
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
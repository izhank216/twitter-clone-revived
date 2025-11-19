// pages/api/tweets.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'tweets.db');

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  let db;
  try {
    db = await openDb();

    if (req.method === 'GET') {
      const rows = await db.all('SELECT * FROM tweets ORDER BY created_at DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { username, content } = req.body;

      if (!username || !content) {
        return res.status(400).json({ error: 'Username and content are required' });
      }

      const result = await db.run(
        'INSERT INTO tweets (username, content, created_at) VALUES (?, ?, datetime("now"))',
        username,
        content
      );

      return res.status(201).json({ id: result.lastID, username, content });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    if (db) await db.close();
  }
}

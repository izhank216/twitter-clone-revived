import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../data/tweets.db');

export default function handler(req, res) {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) return res.status(500).json({ error: err.message });
  });

  if (req.method === 'GET') {
    db.all('SELECT * FROM tweets ORDER BY created_at DESC', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(rows);
    });
  } else if (req.method === 'POST') {
    const { username, content } = req.body;
    const stmt = db.prepare('INSERT INTO tweets (username, content, created_at) VALUES (?, ?, datetime("now"))');
    stmt.run(username, content, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, username, content });
    });
    stmt.finalize();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  db.close();
}

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());


const db = new sqlite3.Database('./echoes.db', (err) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err.message);
  } else {
    console.log('✅ Connected to echoes.db');
  }
});


app.get('/blogs', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql = 'SELECT * FROM blogs ORDER BY id DESC LIMIT ? OFFSET ?';
  db.all(sql, [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});



app.get('/blog', (req, res) => {
  const id = parseInt(req.query.id);

  if (!id) {
    return res.status(400).json({ error: 'Missing blog ID' });
  }

  const sql = 'SELECT * FROM blogs WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(row);
  });
});





app.get('/services', (req, res) => {
  const sql = `SELECT * FROM services`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.get('/service-properties', (req, res) => {
  const sql = `SELECT * FROM serviceproperities`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.get('/service-pricing', (req, res) => {
  const sql = `SELECT * FROM servicepricing`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.get('/service-gallery', (req, res) => {
  const sql = `SELECT * FROM servicegallery`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

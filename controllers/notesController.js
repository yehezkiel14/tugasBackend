import db from '../models/db.js';

// Helper untuk menjalankan query secara asinkron
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Menampilkan semua notes
export const getAllNotes = async (req, res) => {
  try {
    const results = await query('SELECT * FROM notes');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menampilkan salah satu note
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await query('SELECT * FROM notes WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat note baru
export const createNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  if (!title || !datetime || !note) {
    return res.status(400).json({ error: 'Title, datetime, and note are required' });
  }
  try {
    const result = await query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);
    res.status(201).json({ message: 'Note created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengubah note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  if (!title || !datetime || !note) {
    return res.status(400).json({ error: 'Title, datetime, and note are required' });
  }
  try {
    await query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);
    res.status(200).json({ message: 'Note updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM notes WHERE id = ?', [id]);
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

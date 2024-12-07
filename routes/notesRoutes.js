import express from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;

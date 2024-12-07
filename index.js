import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Sajikan file statis dari direktori "public"
app.use(express.static(path.join(path.dirname(''), 'public')));

app.use('/', notesRoutes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

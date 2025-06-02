import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/note.js';
import characterRoutes from './routes/character.js';
import dotenv from 'dotenv';
import { connectToDB } from './db/connection.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);
app.use('/api/characters', characterRoutes);

connectToDB();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

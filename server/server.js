import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/note.js';
import characterRoutes from './routes/character.js';
import userCharacterDataRoutes from './routes/usercharacterdata.js';
import dotenv from 'dotenv';
import { connectToDB } from './db/connection.js';
import compression from 'compression';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use('/api/notes', noteRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/usercharacterdata', userCharacterDataRoutes);

connectToDB();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

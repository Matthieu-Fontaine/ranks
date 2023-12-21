import express from 'express';
import pokemonRouter from './routes/pokemons.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('🏠'))
app.get('/pokemons', pokemonRouter);

export default app;
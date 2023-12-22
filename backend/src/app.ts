import express from 'express';
import pokemonRouter from './routes/pokemons.routes';

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => res.sendStatus(200));

app.use('/pokemons', pokemonRouter);

export default app;
import express from 'express';
import pokemonsRouter from './routes/pokemons.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('🏠'))
app.use('/pokemons',  pokemonsRouter);


export default app;
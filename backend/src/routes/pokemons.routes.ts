import express, { Request, Response } from 'express';
import {
    getPokemonsController,
    getPokemonController,
    postPokemonsController,
    patchPokemonsController,
    deletePokemonsController
}
    from '../controllers/pokemon.controllers';

const pokemonsRouter = express.Router();

pokemonsRouter.get('/', async (req: Request, res: Response) => {
    return await getPokemonsController(req, res);
});

// pokemonsRouter.get('/:id', async (req: Request, res: Response) => {
//     return await getPokemonController(req, res);
// });

// pokemonsRouter.post('/', async (req: Request, res: Response) => {
//     return await postPokemonsController(req, res);
// });

// pokemonsRouter.patch('/:id', async (req: Request, res: Response) => {
//     return await patchPokemonsController(req, res);
// });

// pokemonsRouter.delete('/:id', async (req: Request, res: Response) => {
//     return await deletePokemonsController(req, res);
// });

export default pokemonsRouter;
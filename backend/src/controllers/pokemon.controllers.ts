import { Request, Response } from 'express';
import {
	getPokemons,
	getPokemon,
	createPokemon,
	updatePokemon,
	deletePokemon
} from '../services/pokemons.service';

import Pokemon from '../models/pokemon.model';

import SuccessResponse from '../helpers/successReponse.helper';
import NotFoundResponse from '../helpers/notFoundError.helper';
import ServerErrorResponse from '../helpers/serverError.helper';
import BadRequestResponse from '../helpers/badRequestError.helper';

import { findMissingFields } from '../utils/controllers.util';

async function getPokemonsController(req: Request, res: Response) {
	const pokemons = await getPokemons()
		.catch((err: any) => {
			new ServerErrorResponse(err).send(res);
		});

	return new SuccessResponse(pokemons, 200).send(res);
}


async function getPokemonController(req: Request, res: Response) {
	const id = parseInt(req.params.id);
	const pokemon = await getPokemon(id)
		.catch((err: any) => {
			return new ServerErrorResponse(err).send(res);
		});

	if (!pokemon) {
		return new NotFoundResponse('Not found pokemon', id).send(res);
	}
	return new SuccessResponse(pokemon, 200).send(res);
}

async function postPokemonsController(req: Request, res: Response) {
	const requiredFields = [
		'name', 'url'
	];

	const missingFields = findMissingFields(req.body, requiredFields);
	if (missingFields.length > 0) {
		const errorMessage = `Missing parameters: ${missingFields.join(', ')}`;
		return new BadRequestResponse(errorMessage).send(res);
	}

	const newPokemon = new Pokemon({
		name: req.body.name,
		url: req.body.url
	});

	createPokemon(newPokemon)
		.then((pokemon) => {
			if (!pokemon) {
				return new BadRequestResponse(`Something Wrong`).send(res);
			}

			return new SuccessResponse(pokemon, 201).send(res);
		})
		.catch((error) => {
			if (error.name === 'SequelizeValidationError') {
				// Récupérez les détails sur les champs non validés
				const validationErrors = error.errors.map((e: any) => ({
					field: e.path,
					message: e.message,
				}));

				return new BadRequestResponse(validationErrors).send(res);
			}
			return new ServerErrorResponse(error).send(res);
		});
}

function patchPokemonsController(req: Request, res: Response) {
	const requiredFields = [
		'name', 'url'
	];

	const id = parseInt(req.params.id);

	const missingFields = findMissingFields(req.body, requiredFields);
	if (missingFields.length >= requiredFields.length) {
		const errorMessage = `Missing parameters: ${missingFields.join(', ')}`;
		return new BadRequestResponse(errorMessage).send(res);
	}

	const updatedPokemonData: Partial<Pokemon> = {
		name: req.body.name || undefined, // Utilisez undefined si le champ est absent dans le body
		url: req.body.url || undefined
	};

	updatePokemon(id, updatedPokemonData)
		.then((pokemon) => {
			if (!pokemon) {
				return new BadRequestResponse(`Pokemon with id ${id} not found`).send(res);
			}

			return new SuccessResponse(pokemon, 200).send(res);
		})
		.catch((error) => {
			if (error.name === 'SequelizeValidationError') {
				// Récupérez les détails sur les champs non validés
				const validationErrors = error.errors.map((e: any) => ({
					field: e.path,
					message: e.message,
				}));

				return new BadRequestResponse(validationErrors).send(res);
			} else {
				return new ServerErrorResponse(error).send(res);
			}
		});
}

async function deletePokemonsController(req: Request, res: Response) {
	const id = parseInt(req.params.id);
	const pokemon = await deletePokemon(id)
		.catch((err: any) => {
			return new ServerErrorResponse(err).send(res);
		});
	if (!pokemon) {
		return new BadRequestResponse(`Pokemon with id ${id} not found`).send(res);
	}
	return new SuccessResponse(pokemon, 200).send(res);
}

export {
	getPokemonsController,
	getPokemonController,
	postPokemonsController,
	patchPokemonsController,
	deletePokemonsController
};
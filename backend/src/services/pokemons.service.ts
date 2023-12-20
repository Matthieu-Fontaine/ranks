import Pokemon from "../models/pokemon.model";

async function getPokemon(id: number) {
	const p = await Pokemon.findByPk(id)
		.catch((err: any) => {
			throw err;
		});
	return p;
}

async function getPokemons() {
	const p = await Pokemon.findAll()
		.catch((err: any) => {
			throw err;
		});
	return p;
}

async function createPokemon(pokemon: Partial<Pokemon>) {
	const p = await Pokemon.create({
		name: pokemon.name,
		url: pokemon.url
	})
		.catch((err: any) => {
			throw err;
		});
	return p;
}

async function updatePokemon(id: number, pokemon: Partial<Pokemon>) {
	const p = await Pokemon.update({
		name: pokemon.name,
		url: pokemon.url
	}, {
		where: {
			id: id
		}
	})
		.catch((err: any) => {
			throw err;
		});
	return p;
}

async function deletePokemon(id: number) {
	const p = await Pokemon.destroy({
		where: {
			id: id
		}
	})
		.catch((err: any) => {
			throw err;
		});
	return p;
}

export {
	getPokemons,
	getPokemon,
	createPokemon,
	updatePokemon,
	deletePokemon
};
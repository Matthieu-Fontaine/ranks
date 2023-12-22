import supertest from 'supertest';
import app from '../../src/app';

import { fakePokemon } from '../data/pokemon.data';

const pokemonsService = '../../src/services/pokemons.service';


describe('Pokemons endPoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should get a list of pokemons', async () => {
      // Importation dynamique du module pokemonService pour éviter l'appel réel
      const pokemonService = await import(pokemonsService);

      // Remplacement de la méthode getPokemons par un mock
      pokemonService.getPokemons = jest.fn().mockResolvedValue(fakePokemon);

      const response = await supertest(app).get('/pokemons');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakePokemon);
    });

    it('should get a single pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.getPokemon = jest.fn().mockResolvedValue(fakePokemon[0]);

      const response = await supertest(app).get('/pokemons/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakePokemon[0]);
    });

    it('should return 404 when getting a non-existing pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.getPokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app).get('/pokemons/9999');

      expect(response.status).toBe(404);
    });
  });

  describe('POST', () => {
    it('should create a new pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.createPokemon = jest.fn().mockResolvedValue(fakePokemon[0]);

      const response = await supertest(app)
        .post('/pokemons')
        .send(fakePokemon[0]);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(fakePokemon[0]);
    });

    it('should return 400 when creating a new pokemon with wrong data type', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.createPokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app)
        .post('/pokemons')
        .send({
          name: '12',
          url: 'test'
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 when creating a new pokemon with no data', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.createPokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app)
        .post('/pokemons')
        .send();

      expect(response.status).toBe(400);
    });
  });

  describe('PATCH', () => {
    it('should update an existing pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.updatePokemon = jest.fn().mockResolvedValue(fakePokemon[0]);

      const response = await supertest(app)
        .patch('/pokemons/1')
        .send(fakePokemon[1]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakePokemon[0]);
    });

    it('should return a BadRequestResponse with "Missing parameters" message if both name and url are missing', async () => {
      const response = await supertest(app)
        .patch('/pokemons/1')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Missing parameters: name, url',
      });
    });

    it('should return 400 when updating a pokemon with no data', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.updatePokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app)
        .patch('/pokemons/1')
        .send();

      expect(response.status).toBe(400);
    });

    it('should return 400 when updating a non-existing pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.updatePokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app)
        .patch('/pokemons/9999')
        .send();

      expect(response.status).toBe(400);
    });

    it('should return 400 when updating a pokemon with wrong data type', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.updatePokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app)
        .patch('/pokemons/1')
        .send({
          id: 10,
          name: '12',
          url: 'test',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE', () => {
    it('should delete an existing pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.deletePokemon = jest.fn().mockResolvedValue(fakePokemon[0]);

      const response = await supertest(app).delete('/pokemons/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakePokemon[0]);
    });

    it('should return 404 when deleting a pokemon with no id', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.deletePokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app).delete('/pokemons/');

      expect(response.status).toBe(404);
    });

    it('should return 400 when deleting a non-existing pokemon', async () => {
      const pokemonService = await import(pokemonsService);

      pokemonService.deletePokemon = jest.fn().mockResolvedValue(null);

      const response = await supertest(app).delete('/pokemons/9999');

      expect(response.status).toBe(400);
    });
  });
});

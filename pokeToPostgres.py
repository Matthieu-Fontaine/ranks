import json
import requests
import psycopg2

# Charger les données depuis le fichier
with open('liste_pokemon.json', 'r') as file:
    data = json.load(file)

# Se connecter à la base de données
conn = psycopg2.connect(
    dbname='ranks_db',
    user='matthieuRanks',
    password='U8NGTjbieGAJEf2G',
    host='db',
    port='5432'
)
cursor = conn.cursor()

# Parcourir la liste de Pokémon et insérer les données dans la base de données
for pokemon in data['results']:
    name = pokemon['name']
    url = pokemon['url']

    # Insérer dans la base de données
    cursor.execute("INSERT INTO dev.pokemon (name, url) VALUES (%s, %s)", (name, url))

# Valider les changements et fermer la connexion
conn.commit()
cursor.close()
conn.close()

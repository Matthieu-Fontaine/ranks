import json
import requests

# Charger le fichier JSON depuis un fichier


def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data


# Chemin vers votre fichier JSON
# Remplacez par le chemin vers votre fichier JSON
json_file_path = 'votre_fichier.json'

# Charger les données depuis le fichier JSON
json_data = load_json_file(json_file_path)

# Parcours du fichier JSON pour récupérer name et url
for entry in json_data['results']:
    name = entry['name']
    url = entry['url']

    # Données à envoyer via la requête POST
    payload = {
        "name": name,
        "url": url
    }

    # Exemple d'URL d'API à laquelle envoyer les données
    api_endpoint = 'http://localhost:3000/pokemons'

    # Envoi de la requête POST
    response = requests.post(api_endpoint, json=payload)

    # Vérification de la réponse
    if response.status_code == 200:
        print(f"Données ajoutées pour {name}")
    else:
        print(
            f"Erreur lors de l'ajout des données pour {name}: {response.status_code}")

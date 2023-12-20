## Backend

### Sequelize

npm install --save-dev sequelize-cli

// config.json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "your_database",
    "host": "localhost",
    "dialect": "postgres"
  },
  // Autres environnements (production, test) si nécessaire
}

npx sequelize-cli model:generate --name YourModel --attributes attr1:string,attr2:integer

npx sequelize-cli db:migrate

Revenir en arrière

npx sequelize-cli db:migrate:undo

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-users.js

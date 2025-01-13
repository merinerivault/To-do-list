const express = require('express');   // Importe le module express
const bodyParser = require('body-parser');   // Importe le module body-parser
const taskRoutes = require('./taskRoutes');    // Routes pour les tâches (SQL)
const userRoutesNoSQL = require('./userRoutesNoSQL'); // Routes pour les utilisateurs (NoSQL)

// Import des fichiers de connexion aux bases de données
const mysqlDb = require('./db'); // Connexion MySQL
const mongoDb = require('./dbNoSQL'); // Connexion MongoDB

const app = express();    // Crée une instance d'application Express
const port = 3000;    // Port sur lequel ton serveur va écouter

app.use(bodyParser.json()); // Pour parser les requêtes JSON

// Préfixes spécifiques pour éviter les conflits
app.use('/api/tasks', taskRoutes);    // Routes pour les tâches
app.use('/api/nosql', userRoutesNoSQL); // Routes pour les utilisateurs NoSQL

app.listen(port, () => {     // Démarre le serveur
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


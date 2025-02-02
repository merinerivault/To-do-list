const express = require('express');   // Importe le module express
const bodyParser = require('body-parser');   // Importe le module body-parser
const taskRoutes = require('./routes/taskRoutes');    // Routes pour les tâches (SQL)
const userRoutesNoSQL = require('./routes/userRoutesNoSQL'); // Routes pour les utilisateurs (NoSQL)

// Import des fichiers de connexion aux bases de données
const mysqlDb = require('./db/db'); // Connexion MySQL
const mongoDb = require('./db/dbNoSQL'); // Connexion MongoDB

const app = express();    // Crée une instance d'application Express
const port = 3000;    // Port sur lequel ton serveur va écouter

app.use(bodyParser.json()); // Pour parser les requêtes JSON

// Servir les fichiers statiques du dossier 'public'
app.use(express.static('public'));

// Préfixes spécifiques pour éviter les conflits
app.use('/api/tasks', taskRoutes);    // Routes pour les tâches
app.use('/api/nosql', userRoutesNoSQL); // Routes pour les utilisateurs NoSQL

app.listen(port, () => {     // Démarre le serveur
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


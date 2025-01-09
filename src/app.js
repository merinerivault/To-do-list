const express = require('express');   // Importe le module express
const bodyParser = require('body-parser');   // Importe le module body-parser
const taskRoutes = require('./taskRoutes');    // Importe le fichier taskRoutes.js

const app = express();    // Crée une instance d'application Express
const port = 3000;    // Port sur lequel ton serveur va écouter

app.use(bodyParser.json()); // Pour parser les requêtes JSON
app.use('/api', taskRoutes); // Préfixe des routes API

app.listen(port, () => {     // Démarre le serveur
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

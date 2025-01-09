const mongoose = require('mongoose');   // Importe le module mongoose

const uri = 'mongodb://localhost:27017/to-do-list'; // URI de connexion à la base de données MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })   // Connecte à la base de données MongoDB
    .then(() => console.log('Connecté à MongoDB'))   // Affiche un message de confirmation de connexion
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));   // Affiche un message d'erreur en cas de problème de connexion

module.exports = mongoose;   // Exporte le module mongoose pour qu'il puisse être utilisé dans d'autres parties de ton application

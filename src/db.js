const mysql = require('mysql2');  // Importe le module mysql2

const connection = mysql.createConnection({   // Crée une connexion à la base de données MySQL
  host: 'localhost',        // Adresse de ta base de données
  user: 'root',             // Nom d'utilisateur MySQL
  password: '',             // Mot de passe MySQL
  database: 'to-do-list'      // Nom de ta base de données
});

connection.connect(err => {   // Établit la connexion à la base de données
  if (err) {    // Si une erreur survient, affiche un message d'erreur
    console.error('Erreur de connexion :', err.message);   // Affiche le message d'erreur
  } else {    // Sinon 
    console.log('Connecté à la base de données MySQL.');   // Affiche un message de connexion réussie
  }
});

module.exports = connection;   // Exporte la connexion pour qu'elle puisse être utilisée dans d'autres parties de ton application

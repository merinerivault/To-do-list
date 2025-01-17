//Créer les tâches

const connection = require('./db');   // Importe la connexion à la base de données depuis le fichier db.js

function resetAutoIncrement(callback) {
  const query = 'ALTER TABLE tasks AUTO_INCREMENT = 1';
  connection.query(query, callback);
}

function createTask(text, callback) {   /// Définit une fonction pour créer une nouvelle tâche
  const query = 'INSERT INTO tasks (text, completed) VALUES (?, ?)';    // Construit une requête SQL pour insérer une nouvelle tâche
  connection.query(query, [text, false], (err, results) => {   // Exécute la requête SQL en utilisant la connexion à la base de données
    if (err) return callback(err);    // Si une erreur survient, retourne l'erreur
    callback(null, results.insertId); // Retourne l'ID de la tâche créée
  });
}

//Lire les tâches

function getAllTasks(callback) {    // Définit une fonction pour récupérer toutes les tâches
    const query = 'SELECT * FROM tasks';   // Construit une requête SQL pour récupérer toutes les tâches 
    connection.query(query, (err, results) => {   // Exécute la requête SQL en utilisant la connexion à la base de données
      if (err) return callback(err);    // Si une erreur survient, retourne l'erreur
      callback(null, results); // Retourne toutes les tâches
    });
  }

//Mettre à jour une tâche

function updateTask(id, text, completed, callback) {     // Définit une fonction pour mettre à jour une tâche existante
    const query = 'UPDATE tasks SET text = ?, completed = ? WHERE id = ?';    // Construit une requête SQL pour mettre à jour une tâche existante
    connection.query(query, [text, completed, id], (err, results) => {    // Exécute la requête SQL en utilisant la connexion à la base de données
      if (err) return callback(err);    // Si une erreur survient, retourne l'erreur
      callback(null, results); // Retourne le résultat de la mise à jour
    });
  }
  

//Supprimer une tâche

function deleteTask(id, callback) {     
    const query = 'DELETE FROM tasks WHERE id = ?';    
    connection.query(query, [id], (err, results) => {    // Exécute la requête SQL en utilisant la connexion à la base de données
      if (err) return callback(err);    // Si une erreur survient, retourne l'erreur
      callback(null, results); // Retourne le résultat de la suppression
    });
  }
  
  module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    resetAutoIncrement
  };
const express = require('express');  // Importe le module express
const router = express.Router();    // Crée un routeur Express
const taskModel = require('./taskModel');   // Importe le modèle de tâche
const connection = require('./db'); // Connexion MySQL

// Route pour créer une tâche
router.post('/tasks', (req, res) => {    // Définit une route pour créer une nouvelle tâche
  const { text } = req.body;    // Récupère le texte de la requête
  taskModel.createTask(text, (err, id) => {    // Appelle la fonction createTask du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });   // Si une erreur survient, retourne une réponse d'erreur
    res.status(201).json({ id });    // Retourne l'ID de la tâche créée
  });
});

// Route pour lire toutes les tâches
router.get('/tasks', (req, res) => {    // Définit une route pour récupérer toutes les tâches
  taskModel.getAllTasks((err, tasks) => {    // Appelle la fonction getAllTasks du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });    // Si une erreur survient, retourne une réponse d'erreur
    res.json(tasks);    // Retourne toutes les tâches
  });
});

// Route pour mettre à jour une tâche
router.put('/tasks/:id', (req, res) => {    // Définit une route pour mettre à jour une tâche existante
  const { id } = req.params;     // Récupère l'ID de la tâche à mettre à jour
  const { text, completed } = req.body;     // Récupère le texte et le statut de la tâche à mettre à jour
  taskModel.updateTask(id, text, completed, (err, results) => {    // Appelle la fonction updateTask du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });    // Si une erreur survient, retourne une réponse d'erreur
    res.json(results);
  });
});

// Route pour supprimer une tâche
router.delete('/tasks/:id', (req, res) => {    // Définit une route pour supprimer une tâche existante
  const { id } = req.params;     // Récupère l'ID de la tâche à supprimer
  taskModel.deleteTask(id, (err, results) => {     // Appelle la fonction deleteTask du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });     // Si une erreur survient, retourne une réponse d'erreur
    res.json(results);
  });
});

module.exports = router;   // Exporte le routeur pour qu'il puisse être utilisé dans d'autres parties de ton application

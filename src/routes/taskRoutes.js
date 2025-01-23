const express = require('express');  // Importe le module express
const router = express.Router();    // Crée un routeur Express
const taskModel = require('../models/taskModel');   // Importe le modèle de tâche
const connection = require('../db/db'); // Connexion MySQL

// Route pour créer une tâche
router.post('/', (req, res) => {    // Définit une route pour créer une nouvelle tâche
  const { text } = req.body;    // Récupère le texte de la requête
  taskModel.createTask(text, (err, id) => {    // Appelle la fonction createTask du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });   // Si une erreur survient, retourne une réponse d'erreur
    res.status(201).json({ id });    // Retourne l'ID de la tâche créée
  });
});

// Route pour lire toutes les tâches
router.get('/', (req, res) => {    // Définit une route pour récupérer toutes les tâches
  taskModel.getAllTasks((err, tasks) => {    // Appelle la fonction getAllTasks du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });    // Si une erreur survient, retourne une réponse d'erreur
    res.json(tasks);    // Retourne toutes les tâches
  });
});

// Route pour mettre à jour une tâche
router.put('/:id', (req, res) => {    // Définit une route pour mettre à jour une tâche existante
  const { id } = req.params;     // Récupère l'ID de la tâche à mettre à jour
  const { text, completed } = req.body;     // Récupère le texte et le statut de la tâche à mettre à jour
  taskModel.updateTask(id, text, completed, (err, results) => {    // Appelle la fonction updateTask du modèle de tâche
    if (err) return res.status(500).json({ error: err.message });    // Si une erreur survient, retourne une réponse d'erreur
    res.json(results);
  });
});

// Route pour supprimer une tâche
router.delete('/ :id', (req, res) => {
  const { id } = req.params;
  console.log(`Tentative de suppression de la tâche avec l'ID : ${id}`);

  taskModel.deleteTask(id, (err, results) => {
    if (err) {
      console.error(`Erreur lors de la suppression de la tâche :`, err);
      return res.status(500).json({
        status: "error",
        message: "Une erreur est survenue lors de la suppression.",
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Tâche non trouvée.",
        data: null,
      });
    }

    // Réinitialise l'index auto-incrémenté après la suppression
    taskModel.resetAutoIncrement((resetErr) => {
      if (resetErr) {
        console.error('Erreur lors de la réinitialisation de l\'auto-incrémentation :', resetErr);
        return res.status(500).json({
          status: "error",
          message: "Erreur lors de la réinitialisation de l'auto-incrémentation.",
          error: resetErr.message,
        });
      }

      // Si tout est réussi
      res.json({
        status: "success",
        message: `Tâche avec l'ID ${id} supprimée avec succès.`,
        data: null,
      });
    });
  });
});




module.exports = router;   // Exporte le routeur pour qu'il puisse être utilisé dans d'autres parties de ton application

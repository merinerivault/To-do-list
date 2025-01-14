const express = require('express');
const router = express.Router();
const User = require('./userModelNoSQL');

// Route pour créer un utilisateur
router.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lire tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lire un utilisateur par ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre à jour un utilisateur
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

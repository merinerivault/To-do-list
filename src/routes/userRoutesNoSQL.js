const express = require('express');
const router = express.Router();
const User = require('../models/userModelNoSQL');
const bcrypt = require('bcryptjs');

// Fonction utilitaire pour vérifier les champs requis
const validateFields = (fields, res) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            res.status(400).json({ error: `${key} est requis.` });
            return false;
        }
    }
    return true;
};

// Inscription d'un utilisateur
router.post('/users/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!validateFields({ username, email, password }, res)) return;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Cet email est déjà utilisé.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Connexion d'un utilisateur
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateFields({ email, password }, res)) return;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect.' });

        res.status(200).json({ message: 'Connexion réussie.', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclut le mot de passe des réponses
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer un utilisateur par ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclut le mot de passe
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre à jour un utilisateur
router.put('/users/:id', async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


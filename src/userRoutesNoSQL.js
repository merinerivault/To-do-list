const express = require('express');
const router = express.Router();
const User = require('./userModelNoSQL');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('./authMiddleware');

// Génération du token
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Vérification du token dans authMiddleware.js
const verified = jwt.verify(token, process.env.JWT_SECRET);

// Route protégée pour récupérer les informations de l'utilisateur connecté
router.get('/users/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour l'inscription
router.post('/users/register', async (req, res) => { 
    try {
        const { username, email, password } = req.body;

        // Vérifie si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur avec le mot de passe haché
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour connecter un utilisateur
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifie si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        // Vérifie le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mot de passe incorrect.' });
        }

        // Génère un token JWT
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lire tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lire un utilisateur par ID
router.get('/users/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclut le mot de passe
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Mettre à jour un utilisateur
router.put('/users/:id', authenticateToken, async (req, res) => {
    if (req.user.userId !== req.params.id) {
        return res.status(403).json({ error: 'Accès interdit.' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Supprimer un utilisateur
router.delete('/users/:id', authenticateToken, async (req, res) => {
    if (req.user.userId !== req.params.id) {
        return res.status(403).json({ error: 'Accès interdit.' });
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('./userModelNoSQL');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

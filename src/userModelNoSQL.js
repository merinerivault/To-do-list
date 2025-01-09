const mongoose = require('mongoose');   // Importe le module mongoose

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({    // Crée un nouveau schéma utilisateur
    username: { type: String, required: true, unique: true },    // Le nom d'utilisateur doit être une chaîne de caractères, unique et obligatoire
    email: { type: String, required: true, unique: true },    // L'adresse e-mail doit être une chaîne de caractères, unique et obligatoire
    password: { type: String, required: true },   // Stocker le mot de passe haché pour la sécurité
    preferences: { type: Object, default: {} },   // Exemple : thèmes, notifications, etc.
    created_at: { type: Date, default: Date.now }   // Date de création de l'utilisateur
});

// Créer le modèle utilisateur
const User = mongoose.model('User', userSchema);   

module.exports = User;   // Exporte le modèle utilisateur pour qu'il puisse être utilisé dans d'autres parties de ton application

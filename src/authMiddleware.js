const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified; // Ajoute les données de l'utilisateur au req
        next(); // Passe au middleware ou à la route suivante
    } catch (err) {
        res.status(400).json({ error: 'Token invalide.' });
    }
}

module.exports = authenticateToken;

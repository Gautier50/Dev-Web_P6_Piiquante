//Import du package de token
const jwt = require("jsonwebtoken");

//Mise en place de la logique pour la sécurité d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "erreur d'authentification" });
  }
};

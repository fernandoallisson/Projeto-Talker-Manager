const loginRouter = require('express').Router();
const generateToken = require('../utils/createToken');
const validateEmail = require('../utils/validateEmail');

const HTTP_OK_STATUS = 200;

loginRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken(16);
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRouter;
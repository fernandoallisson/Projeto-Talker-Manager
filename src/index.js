const express = require('express');
const path = require('path');
const fs = require('fs');

const talker = require('./talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const TALKER_PATH_ARCH = path.join(__dirname, './talker.json');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// ----------------------------

app.get('/talker', (req, res) => { // endpoint para obter todos os talkers
  fs.readFile(TALKER_PATH_ARCH, (error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
  });
});

app.get('/talker/:id', (req, res) => { // Endpoint para obter um talker específico pelo id;
  const { id } = req.params;
  const talkerById = talker.find((talkers) => talkers.id === Number(id));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', (req, res) => { // Endpoint para fazer login. Devolve um token aleatório de 16 caracteres;
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.status(401).json({ message: 'Precisa ter alguma coisa no e-mail e senha' });
  }
  const token = Math.random().toString(16).substr(2);
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = {
  app,
};
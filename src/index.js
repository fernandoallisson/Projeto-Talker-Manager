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

// Endpoint para obter todos os talkers;

app.get('/talker', (req, res) => {
  fs.readFile(TALKER_PATH_ARCH, (error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
  });
});

// Endpoint para obter um talker específico pelo id;

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = talker.find((talkers) => talkers.id === Number(id));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerById);
});

module.exports = {
  app,
};
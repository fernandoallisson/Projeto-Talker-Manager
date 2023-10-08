const express = require('express');
const talker = require('./talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// ----------------------------

// Endpoint para obter todos os talkers;

app.get('/talker', (req, res) => {
  if (talker) {
    return res.status(HTTP_OK_STATUS).json(talker);
  }
  return res.status(200).json([]);
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
const routerTalker = require('express').Router();

const path = require('path');
const fs = require('fs');

const talker = require('../talker.json');

const validateToken = require('../middlewares/validateToken');
const {
  validateTalkerAge,
  validateTalkerName,
  validateTalkerTalk,
  validateTalkerWatchedAt,
  validateTalkerRate,
} = require('../middlewares/validateTalkers');

const TALKER_PATH_ARCH = path.join(__dirname, '../talker.json');
const HTTP_OK_STATUS = 200;

routerTalker.get('/talker', (req, res) => {
  fs.readFile(TALKER_PATH_ARCH, (error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
  });
});

routerTalker.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = talker.find((talkers) => talkers.id === Number(id));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerById);
});

routerTalker.post(
  '/talker',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkerWatchedAt,
  validateTalkerRate, (req, res) => {
    const { name, age, talk: { rate, watchedAt } } = req.body;
    const newTalker = {
      name,
      age: Number(age),
      id: talker.length + 1,
      talk: { 
        rate,
        watchedAt,
      },
    };
    talker.push(newTalker);
    fs.writeFile(TALKER_PATH_ARCH, JSON.stringify(talker), (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(201).json(newTalker);
    });
  },
);

routerTalker.put(
  '/talker/:id',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkerWatchedAt,
  validateTalkerRate, (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { rate, watchedAt } } = req.body;
    const talkerById = talker.find((talkers) => talkers.id === Number(id));
    if (!talkerById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const newTalker = {
      name, age: Number(age), id: talkerById.id, talk: { rate, watchedAt },
    };
    talker.splice((talker.indexOf(talkerById)), 1, newTalker);
    fs.writeFile(TALKER_PATH_ARCH, JSON.stringify(talker), (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json(newTalker);
    });
  },
);

routerTalker.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const talkerById = talker.find((talkers) => talkers.id === Number(id));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talker.splice((talker.indexOf(talkerById)), 1);
  fs.writeFile(TALKER_PATH_ARCH, JSON.stringify(talker), (error) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });
});
module.exports = routerTalker;
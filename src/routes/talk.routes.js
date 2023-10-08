const routerTalk = require('express').Router();
const path = require('path');
const fs = require('fs');
const talker = require('../talker.json');

const TALKER_PATH_ARCH = path.join(__dirname, '../talker.json');
const HTTP_OK_STATUS = 200;

routerTalk.get('/talk', (req, res) => {
  fs.readFile(TALKER_PATH_ARCH, (error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
  });
});

routerTalk.get('/talk/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = talker.find((talkers) => talkers.id === Number(id));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerById);
});

module.exports = routerTalk;
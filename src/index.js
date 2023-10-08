const express = require('express');
const routerTalk = require('./routes/talk.routes');
const routerLogin = require('./routes/login.routes');

const HTTP_OK_STATUS = 200;

const app = express();

app.use(express.json());
app.use(routerTalk);
app.use(routerLogin);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// ----------------------------

module.exports = {
  app,
};
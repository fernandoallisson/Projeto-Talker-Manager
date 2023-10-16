const express = require('express');
const routerTalker = require('./routes/talker.routes');
const routerLogin = require('./routes/login.routes');

const PORT = process.env.PORT || 3001;
const HTTP_OK_STATUS = 200;

const app = express();

app.use(express.json());

app.use(routerLogin);
app.use(routerTalker);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => console.log('Server running on port 3001'));

// ----------------------------

module.exports = {
  app,
};
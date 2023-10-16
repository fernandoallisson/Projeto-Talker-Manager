function validateTalkerName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateTalkerAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  const ageNumber = Number(age);
  const numberIsInteger = Number.isInteger(ageNumber);
  const numberIsLessThanEighteen = Number(ageNumber) < 18;

  if (!numberIsInteger || numberIsLessThanEighteen) {
    return res.status(400).json(
      { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
  }

  next();
}

function validateTalkerTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || talk === '') {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
}

function validateTalkerWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json(
      { message: 'O campo "watchedAt" é obrigatório' },
    );
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateTalkerRate(req, res, next) {
  const { talk: { rate } } = req.body;
  const rateNumber = Number(rate);

  if (Number.isNaN(rateNumber)) {
    return res.status(400).json(
      { message: 'O campo "rate" é obrigatório' },
    );
  }

  if (!Number.isInteger(rateNumber) || rateNumber < 1 || rateNumber > 5) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
  }

  next();
}

module.exports = {
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkerWatchedAt,
  validateTalkerRate,
};
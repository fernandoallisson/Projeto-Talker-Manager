function generateToken(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }

  return token;
}

module.exports = generateToken;
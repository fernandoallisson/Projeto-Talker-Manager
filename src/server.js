const { app } = require('./index');

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log('Server running on port 3001'));
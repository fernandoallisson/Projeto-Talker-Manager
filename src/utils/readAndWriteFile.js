const fs = require('fs').promises;

const readFileTalker = async () => {
  const content = await fs.readFile('../talker.json', 'utf-8');
  return JSON.parse(content);
};

const writeFileTalker = async (talker) => {
  await fs.writeFile('./talker.json', JSON.stringify(talker));
};

module.exports = {
  readFileTalker,
  writeFileTalker,
};

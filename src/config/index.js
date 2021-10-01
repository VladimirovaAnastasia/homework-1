const path = require('path');

const dbFolder = path.resolve(__dirname, '../../db/');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');
const jpgFolder = path.resolve(dbFolder, 'jpg');

module.exports = {
  PORT: 8080,

  dbFolder,
  jpgFolder,
  dbDumpFile,
};

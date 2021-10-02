const db = require('../../entities/Database');

module.exports = (req, res) => {
  const allJpgs = db.find().map((jpg) => jpg.toPublicJSON());

  return res.json(allJpgs);
};

const db = require('../../entities/Database');
const Jpg = require('../../entities/Jpg');

const {uploadJpg} = require("../../middlewares/upload");

const {BadRequestApiError} = require("../../validators/errors/ApiError");

module.exports = async (req, res, next) => {
  try {
    const jpgFile = new Jpg();

    await uploadJpg(jpgFile.id, req, res);

    if (req.file === undefined) {
      throw new BadRequestApiError('Please upload a file!');
    }
    jpgFile.size = req.file.size;
    await db.insertJpg(jpgFile);

    await res.json(jpgFile.toPublicJSON());
  } catch (err) {
    next(err)
  }
};

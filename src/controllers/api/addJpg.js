const db = require('../../entities/Database');
const Jpg = require('../../entities/Jpg');

const {uploadJpg} = require("../../middlewares/upload");

const {BadRequestApiError} = require("../../validators/errors/ApiError");

module.exports = async (req, res, next) => {
  try {
    const jpgFile = new Jpg();
    const jpgId = jpgFile.id;

    await uploadJpg(jpgId, req, res);

    if (req.file === undefined) {
      throw new BadRequestApiError('Please upload a file!');
    }
    jpgFile.size = req.file.size;
    jpgFile.mimeType = req.file.mimetype;
    await db.insertJpg(jpgFile);

    return res.json(jpgFile.toPublicJSON());
  } catch (err) {
    next(err)
  }
};

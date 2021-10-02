const path = require('path');


const {exists} = require("../../utils/fs");
const {jpgFolder} = require("../../config");
const {createFileName} = require("../../utils/createFileName");

const {NotFoundApiError} = require("../../validators/errors/ApiError");

module.exports = async (req, res, next) => {
  try {
    const jpgId = req.params.id;
    const fileName = createFileName(jpgId);

    const pathToFile = path.resolve(jpgFolder, fileName);
    const isFileExists = await exists(pathToFile);

    if (isFileExists === false) {
      throw new NotFoundApiError('JPG file not found');
    }

    res.download(pathToFile);
  } catch (err) {
    next(err)
  }
};

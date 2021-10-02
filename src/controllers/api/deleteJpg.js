const path = require('path');

const {jpgFolder} = require('../../config');
const db = require('../../entities/Database');
const {removeFile} = require('../../utils/fs');
const {createFileName} = require("../../utils/createFileName");

module.exports = async (req, res, next) => {
    try {
        const jpgId = req.params.id;

        const fileName = createFileName(jpgId);
        const pathToFile = path.resolve(jpgFolder, fileName);

        await removeFile(pathToFile);
        const id = await db.remove(jpgId);

        return res.json({ id });
    } catch (err) {
        next(err)
    }
};

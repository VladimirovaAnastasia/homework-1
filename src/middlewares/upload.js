const {createFileName} = require("../utils/createFileName");

const util = require("util");
const multer = require("multer");

const {jpgFolder} = require("../config");

module.exports = {
    uploadJpg: async (id, req, res)  => {
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, jpgFolder);
            },
            filename: (req, file, cb) => {
                cb(null, createFileName(id));
            },
        });

        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        };

        let uploadFile = multer({
            storage: storage,
            fileFilter: fileFilter
        }).single("image");

        let uploadFileMiddleware = util.promisify(uploadFile);
        await uploadFileMiddleware(req, res);
    }
};

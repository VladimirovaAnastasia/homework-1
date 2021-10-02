const fs = require('fs');
const path = require('path');

const {exists} = require("../../utils/fs");
const {createFileName} = require("../../utils/createFileName");
const {jpgFolder} = require("../../config");
const db = require('../../entities/Database');
const {replaceBackground} = require("backrem");

const {NotFoundApiError} = require("../../validators/errors/ApiError");

module.exports = async (req, res, next) => {
    try {
        const {front, back, color, threshold} = req.query;

        if (!db.findOne(front) || !db.findOne(back)) {
            throw new NotFoundApiError('JPG file not found');
        }

        const frontStream = fs.createReadStream(
            path.resolve(jpgFolder, createFileName(front))
        );

        const backStream = fs.createReadStream(
            path.resolve(jpgFolder, createFileName(back))
        );

        const colorsMas = color.split(',').map((color) => Number(color))

        replaceBackground(frontStream, backStream, colorsMas, Number(threshold)).then(
            (readableStream) => {
                const writableStream = fs.createWriteStream(
                  path.resolve(jpgFolder, createFileName('result'))
                );

                readableStream.pipe(res);
            }
        );
    } catch (err) {
        next(err)
    }
};


const express = require('express');
const path = require('path');

const router = express.Router();
const api = require('./controllers/api');

let routes = (app) => {
    router.post('/upload', api.addJpg);
    router.get('/list', api.getJpgs);
    router.get('/image/:id', api.getJpg);
    router.delete('/image/:id', api.deleteJpg);
    router.get('/merge', api.mergeBackgrounds);
    app.use(router);
};

module.exports = routes;



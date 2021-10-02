const express = require('express');
const path = require('path');

const router = express.Router();
const api = require('./controllers/api');

router.post('/upload', api.addJpg);
router.get('/list', api.getJpgs);
router.get('/image/:id', api.getJpg);
router.delete('/image/:id', api.deleteJpg);
router.get('/merge', api.mergeBackgrounds);

module.exports = router;

const express = require('express');
const { PORT, svgFolder } = require('./config');

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => res.json({ ping: 'pong' }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

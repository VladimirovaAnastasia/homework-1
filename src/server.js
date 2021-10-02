const express = require('express');
const { PORT } = require('./config');

const app = express();

app.use(express.json());

const initRoutes = require("./routers");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const { PORT } = require('./config');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.urlencoded({ extended: true }));

const router = require("./routers");
app.use('/', router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

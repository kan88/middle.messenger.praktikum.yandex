const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(`${__dirname}/dist`)));

app.use('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});


app.listen(PORT, () => {
  console.log(`Сервер запущен...  http://localhost:${PORT}/`);
});

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'yandex-middle.html'));
});

app.use(express.static(path.join(__dirname, '..', "dist")));

app.listen(PORT);
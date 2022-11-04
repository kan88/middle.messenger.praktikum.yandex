const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.listen(PORT);

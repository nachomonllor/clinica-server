const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/:tipo/:img', (req, res, next) => {
  const { tipo } = req.params;
  const { img } = req.params;
  const pathImage = path.join(__dirname, '../', `uploads/${tipo}/${img}`);
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    const pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg');
    res.sendFile(pathNoImage);
  }
});

module.exports = app;
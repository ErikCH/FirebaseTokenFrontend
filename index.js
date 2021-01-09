const express = require('express');
const http = require('http');
const app = express();

app.use(express.static('dist'));
app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist' }),
);

app.listen(process.env.PORT || 8080);

const express = require('express');
const bodyParser = require('body-parser');
const { static } = require('express');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/puzzle', (req, res) => {
  res.sendFile(__dirname + '/puzzle.html');
});

app.get('/bonus', (req, res) => {
  res.sendFile(__dirname + '/bonus.html');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('running at port 3000!');
});

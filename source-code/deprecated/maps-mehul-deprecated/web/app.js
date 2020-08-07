var express = require("express");
const app = express();

app.listen(8080, () => {
    console.log('listening on 8080');
  });

app.get('/', (req, res) => {
    res.sendFile('googlemarker.html' , { root : __dirname});
});

app.get('/google.js', (req, res) => {
  res.sendFile('google.js' , { root : __dirname});
});

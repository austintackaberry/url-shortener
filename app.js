var http = require('http');
var express = require('express');
var app = express();
var longUrlArr = [];
var shortUrlArr = [];

app.use('/', express.static('public'));

app.get('/:url*', function(req, res) {
  var url = req.params.url + req.params[0];
  if (shortUrlArr.includes(url)) {
    res.redirect(longUrlArr[shortUrlArr.indexOf(url)]);
  }
  else if (!longUrlArr.includes(url)) {
    longUrlArr.push(url);
    var randoNum = ""
    for (let i = 0; i < 5; i++) {
      randoNum += Math.floor(Math.random()*10).toString();
    }
    shortUrlArr.push(randoNum);
    console.log("longUrlArr = " + longUrlArr);
    console.log("shortUrlArr = " + shortUrlArr);
    var outputJSON = {
      "original_url": url,
      "short_url": "localhost:8000/" + randoNum
    }
    res.send(outputJSON);
  }
});

app.listen(8000);
console.log('Listening on port 8000...');

var express = require('express');
var app = express();
var bp = require('body-parser');
var path = require('path');
//parsers
app.use(function(req,res,next){console.log("static1"); next();},bp.json());
app.use(function(req,res,next){console.log("static2"); next();},bp.urlencoded({ extended: true }));

app.use(function(req, res, next) { console.log('Message Received'); next(); });

const triggerMap = {
  abc: {
    transformationFunction: "",
    templateName: ""
  }
};

//static
app.use(function(req,res,next){console.log("stati3"); next();},
  express.static(path.join(__dirname, '/'))
);

// app.get('/', function (req, res) {
//   var options = {
//     root: __dirname + '/',
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };
//   res.sendFile('index.html',options,function(err){
//     if(err)
//       console.log(err);
//   });
// });

app.post('/posts', function (req, res) {
  console.log(req.body);
  res.send('POST request to homepage has been received.');
  res.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

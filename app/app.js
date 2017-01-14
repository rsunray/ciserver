var express = require('express');
var app = express();
var bp = require('body-parser');
var path = require('path');
const fs = require('fs');
var redis = require('redis');
var client = redis.createClient();
//static file service
app.use(express.static(path.join(__dirname, '/'))
);
//parsers
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//trigger info
var triggerId;
var FinalPayload = new Object();
const triggerMap = {
  lg123: {
    templateName: 'template.json',
    transformationFun: function(payload){
      var temp = JSON.parse(payload);
      return temp.head_commt.url;
    }
  }
};

app.post('/posts/:triggerId', function (req, res,next) {
  triggerId = req.params.triggerId;
  console.log(triggerId);
  res.send('recieved');
  next();
},function(req,res){
  var triggers = Object.getOwnPropertyNames(triggerMap);
  triggers.forEach(trigger => {
    if(trigger === triggerId){
      var url = triggerMap[trigger].transformationFun(req.body);
      var tem = fs.readFileSync('./workflow_templates'+triggerMap[trigger].templateName);
      var workflow = JSON.parse(tem);
      FinalPayload = {
        repo_url : url,
        template : workflow
      }
    }
  });

  res.end();
});

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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

var express = require('express');
var router = express.Router();
let count = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/brew', (req, res) => {
  const drink = req.query.drink;

  if (drink === 'tea') {
      res.send('A delicious cup of tea!');
  } else if (drink === 'coffee') {
      res.status(418).send();
  } else {
      res.status(400).send();
  }
});

let lastMessage = 'first';

router.post('/pass-it-on', (req, res) => {

  var message = req.body.message;

  if (!message) {
    res.status(400).send();
  } else {
    var oldMessage = lastMessage;
    lastMessage = message;
    res.lastMessage = oldMessage;
    res.send(res.lastMessage);
  }
});

router.post ('/combine', (req, res)=>{
  const lines = req.body.lines;
  const suffix = req.body.suffix;

  let newLines = lines.map(lines=>lines+suffix);
  let respones = newLines.join('\n');
  res.send(respones);
});

module.exports = router;

let posts =[];

router.post('/users/addpost', (req, res)=>{
  const post= req.body;
  posts.unshift(post);
  res.status(200).send();
});

router.get('/users/getposts', (req, res)=>{
  res.send(posts);
});

let cookie =0;
router.get('/cookie',(req,res)=>{
  cookie++;
  res.cookie('task3_1', cookie);
  res.status(200).send();
});
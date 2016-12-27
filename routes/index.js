var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* GET home page. */
router.get('/', callback);
router.get('/index', callback);

function callback(req, res, next) {
  Post.get(null,function (err, posts) {
    if (err) {
       posts = [];
    }
    res.locals.posts = posts;
    res.render('index',{
      title:'首页',
    });
  });
};

module.exports = router ;

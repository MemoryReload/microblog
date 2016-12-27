var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

/* GET users listing. */
router.get('/:user', function(req, res, next) {
  User.get(req.params.user, function (err, user) {
    if (!user) {
      req.flash('error','用户不存在');
      return res.redirect('/');
    }
    Post.get(user.name,function (err, posts) {
      console.log('>>>>>>>>>>posts:'+posts.toString()+',length:'+posts.length);
      if (err) {
        req.flash('error',err);
        return req.redirect('/');
      }
      res.locals.posts = posts;
      res.render('users',{
        title: user.name,
      });
    });
  });
});

module.exports = router;

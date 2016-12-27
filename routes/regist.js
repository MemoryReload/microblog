var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var check = require('./loginStateCheck');

router.all('/',check.checkNotLogin);

router.get('/',function(req,res){
  res.render('regist',{
    title:'注册'
  });
});

router.post('/',function(req,res){
  //检查密码不为空，以及其它的密码规则检查
  if (req.body['password'].length == 0 || req.body['username'].length == 0){
    req.flash('error','用户名、密码不能为空或包含非法字符');
    return res.redirect('/regist');
  }
  //检验用户两次输入的口令是否一致
  if (req.body['password'] !== req.body['password-repeat']) {
    req.flash('error','两次输入的口令不一致');
    return res.redirect('/regist');
  }
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.username,
    password: password
  });

  //检查用户名是否已经存在
  User.get(newUser.name,function(err,user){
    if (user) {
      err = 'Username already exits.';
    }
    if (err) {
      req.flash('error',err);
      return res.redirect('/regist');
    }
    //如果不存在则新增用户
    newUser.save(function (err) {
      if (err) {
        req.flash('error',err);
        return res.redirect('/regist');
      }
      req.session.user = newUser;
      req.flash('success','注册成功');
      res.redirect('/');
    });
  });
});
module.exports = router;

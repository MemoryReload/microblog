var express = require('express');
var router = express.Router();
var check = require('./loginStateCheck');

router.all('/',check.checkLogin);

router.get('/',function(req,res){
  req.session.user = null;
  req.flash('success','登出成功');
  res.redirect('/');
});
module.exports = router;

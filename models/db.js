var settings = require('../settings');
var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.dboptions.db, new Server(settings.dboptions.host, settings.dboptions.port,{}));

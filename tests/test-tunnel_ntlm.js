// test that we can tunnel a https request over an http proxy
// keeping all the CA and whatnot intact.
//
// Note: this requires that squid is installed.
// If the proxy fails to start, we'll just log a warning and assume success.

var server = require('./server')
  , assert = require('assert')
  , request = require('../index')
  , fs = require('fs')
  , path = require('path')
  , caFile = path.resolve(__dirname, 'ssl/npm-ca.crt')
  , ca = fs.readFileSync(caFile)
  , proxy = 'http://emeafrascs02:8080'
  , hadError = null

setTimeout(function() {
  //request({ uri: 'https://registry.npmjs.org/yeoman'
  request({ uri: 'https://github.com/mikeal/request'
          , proxy: proxy
          , strictSSL: true
          , ca: ca
          , json: true }, function (er, response, body) {
    hadError = er;
    //console.log(er || body);

    console.log('Response: ', response);

    if (!er) console.log("ok");
  });
}, 100);

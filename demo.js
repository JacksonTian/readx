'use strict';

var read = require('./');
var co = require('co');
var fs = require('fs');

co(function *() {
  var stream = fs.createReadStream(__filename, {highWaterMark: 10});
  var buffers = [];
  var channel = read(stream);
  var data;
  while ((data = yield channel)) {
    buffers.push(data);
  }
  return Buffer.concat(buffers);
}).then(function (data) {
  console.log(data.toString());
}, function () {

});

'use strict';

var make = function () {
  var queue = [];
  var fn = function (done) {
    queue.push(done);
  };

  fn.consume = function (err, data) {
    var done = queue.shift();
    done(err, data);
  };

  return fn;
};

module.exports = function (stream) {
  var chan = make();
  var errHandle = function (err) {
    chan.consume(err);
  };

  var dataHandle = function (data) {
    chan.consume(null, data);
  };

  var endHandle = function () {
    chan.consume(null);
  };

  stream.on('error', errHandle);

  stream.on('data', dataHandle);

  stream.on('end', endHandle);

  return chan;
};

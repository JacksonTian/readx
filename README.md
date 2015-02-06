# readx
Read stream like sync call

## Demo
```js
'use strict';

var read = require('readx');
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
```
## License
The MIT license. Please enjoy it.

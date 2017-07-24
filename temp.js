var rp = require('request-promise'), 
    fs      = require('fs'),
    url     = 'http://www3.nd.edu/~dchiang/teaching/nlp/2016/images/chiang.png';
var writeContent = require("./utils/write-contents");
rp(url, {encoding: 'binary'}).then ((body) => {
	writeContent.writeImage('images/chiang.png', body);
  // fs.writeFile('downloaded.jpg', body, 'binary', function (err) {});
});
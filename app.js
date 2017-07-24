var request = require("request");
var parseBody = require("./utils/parse-body.js");
var baseurl = "http://www3.nd.edu/~dchiang/teaching/nlp/2016/";


//Connect to mongoose

// Initial request
request.get(baseurl, function(error, response, body) {
	if (error) {
		throw new Exception(error.message ? error.message : "Request error!");
	}
	var matchedArray = parseBody(body);
	for (var i=0; i<matchedArray.length; i++) {
		console.log(matchedArray[i].split("\"")[1]);
	}

});
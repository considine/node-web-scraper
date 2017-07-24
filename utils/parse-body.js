const cheerio = require('cheerio');


/**
 * Uses Cheerio, a backend Jquery library, to parse the html and return
 * only href tags
 * @param  {String} reqBody the requestbody
 * @return {[type]}         [description]
 */
function parseBody(reqBody) {
	const $ = cheerio.load(reqBody);
	var aTags =  $("a");
	var retArray = [];
	for (var  i=0; i<aTags.length; i++) {
		if (!aTags[i].attribs["href"]) continue 
		retArray.push(aTags[i].attribs["href"]);
		
	}
	return retArray;
}

module.exports  = parseBody;
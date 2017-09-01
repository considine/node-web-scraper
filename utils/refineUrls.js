/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package site duplicator
* 2017-07-24
*/
var Url = require("../models/url");
const httpRegexp = /^http/;
/**
 * Given a url array, want to make sure it is not from an outside site
 * ie doesn't begin with http. If it is not, create url Model, save to mongoose,
 * curl the file into the appropriate subdir also get it's path
 * @param  {[type]} urlArray [description]
 * @return {[type]}          [description]
 */
module.exports = (urlArray) => {
	return new Promise(function(resolve, reject) {
		for (var i=0; i<urlArray.length; i++) {
			/* Remove links to outside sites */
			if (urlArray[i].match(httpRegexp)) continue;
		
			/* Remove hashes */
			var refinedUrl = urlArray[i].split("#")[0];
			var refinedUrl = refinedUrl.split("?")[0];
			if (!refinedUrl || refinedUrl.replace(/^\s+|\s+$/g, '').length === 0) continue;
			insertToMongoose(refinedUrl);

		}
		resolve();
	});
	
}


function insertToMongoose (url) {

	//Rely on mongoose index check to prevent duplicates. 

	new Url({urlString : url}).save().then((url) => {
		
	})
	.catch((e) => {
		
	});


}



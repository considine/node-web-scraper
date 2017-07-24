/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package 
* 2017-07-24
*/

const cheerio = require('cheerio');
const rp = require("request-promise");
const writeContents = require("./write-contents");
const siteDetails = require("./baseurl");
var Url = require("../models/url");
/**
 * [description]
 * @param  {[type]} htmlstring [description]
 * @return {[type]}            [description]
 */
module.exports = (htmlstring) => {
	return new Promise(function(resolve, reject) {
		const $ = cheerio.load(htmlstring);

		handleTag("script", "src", $, normalWrite);
		handleTag("link", "href", $, normalWrite);
		handleTag("img", "src", $, imageWrite);


		resolve();

	//Styles
	});
}


function handleTag (tagName, attribName, $, writeFileData) {
	var sTags = $(tagName);

	// Scripts
	for (var i=0; i<sTags.length; i++) {
		if (!sTags[i].attribs[attribName]) continue;
		if (sTags[i].attribs[attribName].match(/^http/)) continue;
		new Url({urlString : sTags[i].attribs[attribName]}).save()
		.then ((urlObj) => {
			// Make request
			
			writeFileData(urlObj.urlString).catch((e) => {
				// Do nothing
				console.log(e)
			});
			
		}).catch((e) => {
			// Do nothing
		});
	}
}



function normalWrite (urlStr) {
	var fullUrl = siteDetails.createUrl(siteDetails.url, urlStr);
	return rp(fullUrl, {encoding: 'binary'})
			.then((body) => {
				writeContents.writeImage(urlStr, body);
				// writeContents.writeImage(urlStr, imgResp); // save the file 
			});
		}


function imageWrite (urlStr) {

	var fullUrl = siteDetails.createUrl(siteDetails.url, urlStr);
	console.log(fullUrl);
	console.log(urlStr);
	return rp(fullUrl, {encoding: 'binary'})
			.then((body) => {
				writeContents.writeImage(urlStr, body);
				// writeContents.writeImage(urlStr, imgResp); // save the file 
			});
			
	
}
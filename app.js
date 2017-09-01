// To Run on a new site: Change the baseurl, and change the name 
// of the site that

var rp = require('request-promise');
var mongoose =require("mongoose");
mongoose.Promise = require('bluebird');
var parseBody = require("./utils/parse-body.js");
var refineUrl = require('./utils/refineUrls');
var initCrawl = require("./utils/initcrawl.js");
const crawl = require("./utils/get-next");
const siteDetails = require("./utils/baseurl");
const baseurl = siteDetails.url;
const siteName = siteDetails.sitename.toLowerCase().replace(/ /g, "_");
const writeContents = require("./utils/write-contents");
const getExtras = require("./utils/get-js-and-css");
const replaceAll = require("./utils/replaceall");
console.log(siteName);


//Connect to mongoose
mongoose.connect ('mongodb://localhost/' + siteName, { useMongoClient: true });
db = mongoose.connection;
db.on('error', function() {
  throw Error("Could not connect to mongoose")
} );

/**
 * [crawlrecurse description]
 * @param  {[type]} furl [description]
 * @return {[type]}      [description]
 */
function crawlrecurse (furl) {
	
	setTimeout(function () {
		if (!furl) {
			/*  We're done */
			console.log("Done!");
			return;
		}


		// consturct url 
		var fullUrl = siteDetails.createUrl(baseurl, furl.urlString);
		// console.log("crawling! " + fullUrl);
		// Recurse onitself
		rp(fullUrl, {encoding : "binary"})
		.then((htmlstr) => {
			htmlstr = replaceAll(htmlstr, baseurl, "");
			writeContents.writeImage(furl.urlString, htmlstr); // save the file 
			getExtras(htmlstr); // Get any html and css we don't have
			refineUrl(parseBody(htmlstr))
			.then(crawl)
			.then(crawlrecurse)
			.catch((e) => {
				throw new Error( (e.message) ? e.message : "Error  crawling");
			});
		})
		.catch((e) => {
			// Go to next
			crawl().then(crawlrecurse);
		});
	}, 0);		
}
initCrawl().then(crawl).then((furl) => {
	if (!furl) {
		/*  We're done */
		console.log("Done!");
		return;
	}
	crawlrecurse(furl);

	
});

// rp(baseurl).then((htmlstr) => {
// 	refineUrl(parseBody(htmlstr));
// }).catch((err) => {
// 	throw new Error((err.message) ?  err.message : "error on request!");
// });


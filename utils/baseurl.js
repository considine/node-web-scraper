module.exports.url = "http://www3.nd.edu/~dchiang/teaching/nlp/2016/";
module.exports.sitename = "David Chiang NLP";
module.exports.foothold = "index.html";


/**
 * Simple utility function for combining a base and extension 
 * making sure that there is an appropriate number of slashes
 * @param  {string} base    base href
 * @param  {string} extension  the end part of the url
 * @return {string}   the combined url
 */
module.exports.createUrl = (base, extension) => {

	if (base[base.length -1] === "/") return base + extension;
	return base + "/" + extension;
}
module.exports.url = "https://webpack.js.org/";
module.exports.sitename = "webpack";
module.exports.foothold = "index.html";


/**
 * Simple utility function for combining a base and extension 
 * making sure that there is an appropriate number of slashes
 * @param  {string} base    base href
 * @param  {string} extension  the end part of the url
 * @return {string}   the combined url
 */
module.exports.createUrl = (base, extension) => {
	if (extension[0] === "/")  extension.slice(1, 0)
	if (base[base.length -1] === "/") return base + extension;
	return base + "/" + extension;
}

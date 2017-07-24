var Url = require("../models/url");
var base = require("./baseurl").url;
var foothold = require("./baseurl").foothold;
/**
 * Returns promsie
 * @return {[type]} [description]
 */
module.exports = () => {
	var fullUrl = require("./baseurl").createUrl(base, foothold);
	return new Url({urlString : foothold}).save();
}
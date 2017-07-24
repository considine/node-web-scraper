/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package site-duplicator 1.0.0
* 2017-07-24
*/
var Url = require('../models/url');


/**
 * Gets a site that is not yet crawled. If can't f ind one we're done
 * @return {[type]} [description]
 */
module.exports = () => {
	return Url.findOneAndUpdate({crawled : false}, {crawled : true}).exec();
}
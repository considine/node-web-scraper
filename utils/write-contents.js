/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package 
* 2017-07-24
*/


var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;


function FileWriter () {
	/**
	 * Writes contents to a file when crawling
	 * @param  {[type]} path     [description]
	 * @param  {[type]} contents [description]
	 * @return {[type]}          [description]
	 */
	this.writeFile = function(path, contents) {
  	createDir(path, contents, 
  		function(retPat, retContent) {
	  		fs.writeFile(retPat, retContent, function () {
	    	// success
	    	
	    	});
	  	})
    
	}
	this.writeImage = function(path, contents) {
		console.log("Writing image!" + path);
		createDir(path, contents, 
	  		function(retPat, retContent) {
		  		fs.writeFile(retPat, retContent, 'binary', function (err) {});
		  	})
	}
	function createDir(rawPath, contents, cb) {
		var path = (rawPath[0] === "/") ? "./siteDir" + rawPath  : "./siteDir/" + rawPath;
		console.log(path);
		mkdirp(getDirName(path), function (err) {
			if (err) console.log("Error creating directory! " + err.message);

			cb(path, contents);
		});
	}

}
module.exports = new FileWriter();
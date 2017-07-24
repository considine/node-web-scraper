const reHref = /<a href=\".*?\">/g;

function parseBody(reqBody) {
	/* Searching for <a href tags */
	var found = reqBody.match(reHref);
	return found;
}

module.exports  = parseBody;
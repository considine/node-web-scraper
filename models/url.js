var mongoose = require("mongoose");
var schema = mongoose.Schema;


const urlObj = {
	urlString : {type : String, index : true, unique : true}
}

const urlSchema = new schema(urlObj);
const urlModel = mongoose.model("link", urlSchema);
module.exports = urlModel; 
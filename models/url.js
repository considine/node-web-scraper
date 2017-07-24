var mongoose = require("mongoose");
var schema = mongoose.Schema;


const urlObj = {
	urlString : {type : String, index : true, unique : true},
	crawled : {type : Boolean, required : true, default : false}
}

const urlSchema = new schema(urlObj);
const urlModel = mongoose.model("link", urlSchema);
module.exports = urlModel; 
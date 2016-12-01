const mongoose = require('mongoose'),
			Schema = mongoose.Schema,


//Define our model
const postSchema = new Schema({
	title: { type: String, unique: true, lowercase: true },
	location: String,
  content: String
});


//Create Model Class
const ModelClass = mongoose.model('post', userSchema);

//export modeal
module.exports = ModelClass;

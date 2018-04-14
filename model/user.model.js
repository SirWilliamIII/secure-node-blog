const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId


const UserSchema = new Schema({
	email: String,
	facebookId: String,
	password: String,
	profilePic: String,
	peopleFollowing: [String],
	followers: [String],
	username: {
		type: String,
		required: true,
		unique: true
	},
	articles: {
		type: ObjectId,
		ref: 'Article'
	}
})

module.exports = mongoose.model('User', UserSchema)

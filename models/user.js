const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    creationDate: {
	type: Date,
	required: true,
	default: Date.now
    },
    first_name: String,
    last_name: String,
    email: String,
    firebase_id: {
        type: String,
        required: true,
    },
    avatar: {
        type: Buffer,
    }
});

module.exports = mongoose.model('User', userSchema);

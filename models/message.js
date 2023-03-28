const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    creationDate: {
	type: Date,
	required: true,
	default: Date.now
    },
    messageText:{
	type: String,
	required: true
    },
    messageTitle:{
	type: String,
	required: true,
	default: 'Mensajito Bonito'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model('Message', messageSchema);


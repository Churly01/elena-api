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
    creator: new mongoose.Schema({
        name: String,
        firebaseId: String
    })
});

module.exports = mongoose.model('Message', messageSchema);


const express = require('express');
const router= express.Router();
const Message = require('../models/message');

// Getting all messages
router.get('/', async (req, res) => {
    try{
	const messages = await Message.find();
	res.json(messages);
    }
    catch(err)
    {
	res.status(500).json({message:err.message});
    }

});

// Getting One
router.get('/:id',getMessage, (req, res) => {
    res.json(res.message);
});


// Creating One
router.post('/', async (req, res ) => {
    const message = new Message({
	messageText: req.body.messageText,
	messageTitle: req.body.messageTitle,
    });
    
    try{
	const newMessage = await message.save();
	res.status(201).json(newMessage);
    } catch(err){
	res.status(400).json(err.message);
    }
});

// Updating One
router.patch('/:id', getMessage, async (req, res) => {
    if(req.body.messageText !=null)
	res.message.messageText = req.body.messageText;
    if(req.body.messageTitle !=null)
	res.message.messageTitle = req.body.messageTitle;

    try{
	const updatedMessage = await res.message.save();
	res.json(updatedMessage);
    }catch(err){
	res.status(400).json({message:err.message});
    }
});


// Deleting One

router.delete('/:id', getMessage, async (req,res) => {
    try{
	await res.message.remove();
	res.json({message:'Deleted Message'});
    }catch(err){
	res.status(500).json({message:err.message});
    }

});

async function getMessage(req, res, next){
    let  message;
    try{

	message = await Message.findById(req.params.id);
	if(message ==  null) {
	    return res.status(404).json({message:'Cannot Find Message'});
	}
	
    } catch(err){
	return res.status(500).json({message: err.message});
    }

    res.message = message;
    next();
}


module.exports = router;

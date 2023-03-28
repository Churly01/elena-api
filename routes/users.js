const express = require('express');
const router= express.Router();
const User = require('../models/user');

// Getting a user by ID
router.get('/firebase/:firebase_id', getUserByFirebaseId,async (req, res) => {
    res.json(res.user);
});

// Creating a user
router.post('/', async (req, res) => {    
    const user = new User({
        first_name: req.body.first_name || '',
        last_name: req.body.last_name || '',
        email: req.body.email || '',
        firebase_id: req.body.firebase_id,
    });
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});

// Updating a user
router.patch('/firebase/:id', getUserByFirebaseId, async(req, res) => {
    //TODO
});

async function getUserByFirebaseId(req, res, next) {
    let user;
    try{
        user = await User.find({firebase_id:req.params.firebase_id});
        console.log(user);
        if(user == null)
            return res.status(404).json({message: 'Cannot find any user with firebaseID'});        
    } catch(err){
        return res.status(500).json({message:err.message});
    }
    res.user=user;
    next();
};

module.exports = router;

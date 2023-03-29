const express	= require('express');
const User	= require('../models/user');
const router	= express.Router();
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
    if(req.body.last_name !== null) {
        res.user.last_name=req.body.last_name;
    }
    if(req.body.first_name !== null) {
        res.user.first_name=req.body.first_name;
    }
    if(req.body.avatar !== null) {
        res.user.avatar=req.body.avatar;     
    }
    try{
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
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

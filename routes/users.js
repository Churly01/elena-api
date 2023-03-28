const express = require('express');
const router= express.Router();
const User = require('../models/user');

// Getting a user by ID
router.get('/:id', async (req, res) => {


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
        res.status(500).json(err.message);
    }
});

// Updating a user
router.patch('/:id', getUser, async(req, res) => {
    //TODO
});



const getUser = async (req, res, next) => {
   
};

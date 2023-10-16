const User = require("../models/users")
const express = require('express');
const bcrypt=require("bcryptjs")
const signup= async (req, res) => {
    const { username, password, email} = req.body;
        const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user1= await User.findOne({email:email})
    if(user1) res.status(400).json("Email already exists")
    else{
      const user = new User({ 
        username,
        password: hashedPassword, 
        email,
        });
        try {

            await user.save();
            // Create JWT token
            // const token = jwt.sign({ id: user._id }, JWT_SECRET);
            res.json({email,username });
            } catch (err) {
            console.log(err);
            res.status(500).json('Error signing up');
            }
        }
}
module.exports=signup
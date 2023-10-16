const express = require('express');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  })


    
  
  // Create user model
  const User = mongoose.model('user', userSchema);
  module.exports=User;
const express= require('express');
import User from '../../models/User.js';
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "your_secret_key";

app.post('/register',async(req,res)=>{
    const {name, role,password,email,contact} = req.body;
    if(!name || !role || !password || !email || !contact) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
        username: name,
        role:role,
        password:hashedPassword,
        email:email,
        contact:contact
    })

    try{
        await newUser.save();
        res.status(201).json({message:'User registered successfully'});
    }
     catch (err) {
        res.status(400).json({ message: "Error registering user." });
    }
})


app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user=await User.findOne({username});
    if(!user){
        return res.status(400).json({ message: 'User not found' });
    }
    const isMatch=await bcrypt.compare(password,user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
    }
    const token=jwt.sign({id:user._id,role:user.role},SECRET,{expiresIn:'1h'});
    res.status(200).json({ token, role:user.role,userId:user._id});
})
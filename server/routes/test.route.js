const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model')
const Post = require('../models/post.model')
const isAuthenticated = require("./../middleware/isAuthenticated");

router.post("/user",async (req,res)=>{
    const user = new User({
        name:"test",
        email:"emfail",
        password:"passwoasdad",
    })
    const u = await user.save();
    console.log(u)
    res.send("done user");
})

router.post('/post',async(req,res)=>{
    const post = new Post({
        title:"sdfs",
        content:"ssdfsfsf",
        author:"650c6b98f1ead6c88d55190d",
    })
    const g = await post.save();
    g.author = await User.findById(post.author);
    console.log(g);
    res.json(g);
})

router.get("/isAuth",isAuthenticated,(req,res)=>{
    res.json(req.user);
})

module.exports = router;
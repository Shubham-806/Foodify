const express = require('express')

const router = express. Router()

const User = require('../models/User')
const { query, validationResult, body } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const jwtsecret="mynameisShubham"
router.post("/createuser",[
    body('email'). isEmail(),
    body('password','Incorrect Password').isLength({min:5}),
    body('name').isLength({min:5})],
async (req, res)=>{ 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let secPassword =await bcrypt.hash(req.body.password,salt)

    try {

      await User.create({

       name: req.body.name,
       password:secPassword, 
       email: req.body.email, 
       location: req.body.location

})
res.json({success:true});
    }

     catch (error) {

console.log(error)

res.json({success:false});

}

})

router.post("/loginuser",[
    body('email'). isEmail(),
    body('password').isLength({min:5}),
   ],async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email= req.body.email;


    try {
        let userData=

      await User.findOne({email});

    if(!userData){
        return res.status(400).json({ errors: "Try login with correct details" });

    }
    const pwdCompare = await bcrypt.compare (req.body.password,userData.password)
    if(!pwdCompare){
        return res.status(400).json({ errors: "Try login with correct details" });

    }
    const data={
        user:{
            id:userData.id
        }
    }
    const authToken =jwt.sign(data,jwtsecret)
    return res.json({success:true,authToken:authToken});
    
}

     catch (error) {

console.log(error)

res.json({success:false});

}

})

module.exports=router;
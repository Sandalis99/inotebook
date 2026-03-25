const express = require('express');
const router = express.Router()
const User= require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$boy'
// jsonbtoken should be downloaded 


// Route 1: create a user using : Post "/api/auth/createuser". doesnt require auth No login required
router.post('/createuser',[
   body('email','Enter a valid email').isEmail(),
   body('name','Enter a valid name').isLength({min:3}),
   body('password','Password must be atleast 5 characters').isLength({min:5})],
async (req,res)=>{
   let success=false;
// if there are errors return bad request

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

   //  check whether the user with this email exits already
try{
   
   let user = await User.findOne({email:req.body.email});
   if(user){
      return res.status(400).json({success,error:"Sorry a user with this email alreay exists"})
   }
      
   //  Create a new user
   const salt= await bcrypt.genSalt(10);
   const secPass= await bcrypt.hash(req.body.password,salt)
     user= await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

   const data={
      user:{
         id:user.id
      }
   }

   // we will generate a authtoken so that if anybody gives us back
   //  that token then we can convert that token into that data of the
   //  user and by the use of JWT_SECRET  we can also find out that the user have
   //  tempered(changed) with the data or not
    const authtoken = jwt.sign(data,JWT_SECRET);


   // res.json(user)
   success=true;
   res.json({success,authtoken})

   }catch (error){
      console.error(error.message);
      res.status(500).send("Some error occured");
   }
})

// Route2: Authenticate a user using : Post "/api/auth/login".No login required
router.post('/login',[
   body('email','Enter a valid email').isEmail(), 
   body('password','Password Cannot be blank').exists(), 
], async (req,res)=>{
   let success=false;
   

   // if there  are errors,return Bad request and the errors
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{ email,password}=req.body;
    try{
     let user= await User.findOne({email});
     if(!user){
      success=false
      return res.status(400).json({error:"Please try to login with correct Credentials"});
     }

     const passwordCompare=  await bcrypt.compare(password,user.password); 
     if(!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"Please try to login with correct Credentials"});
     }

     const data={
      user:{
         id:user.id
      }
   }
   const authtoken= jwt.sign(data,JWT_SECRET)
   success=true;
      res.json({success,authtoken})

     } catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }



})

// Route 3: Get loggedin user details using :Post "/api/auth/getuser".Login required
router.post('/getuser',fetchuser, async (req,res)=>{
 

try {
   userId=req.user.id;
   const user=await User.findById(userId).select("-password")
   res.send(user);
} catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }
})
module.exports=router
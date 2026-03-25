const mongoose = require('mongoose');
const {Schema}=mongoose;

// for the below schema we went to the mongooesejs.com->read docs->schemas and the pasted it below and then we will make te changes according to our requirement

const UserSchema = new Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true
 },
 date:{
    type:Date,
    default:Date.now
 }
});
const User= mongoose.model('user',UserSchema);
// User.createIndexes();
module.exports=User;
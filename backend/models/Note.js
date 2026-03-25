const mongoose = require('mongoose');
const {Schema}=mongoose;

// for the below schema we went to the mongooesejs.com->read docs->schemas and the pasted it below and then we will make te changes according to our requirement

const NotesSchema = new Schema({
   user:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'user'
   },
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true,
    
 },
 tag:{
    type:String,
    default:"General"
 
 },
 date:{
    type:Date,
    default:Date.now
 }
});
module.exports= mongoose.model('notes',NotesSchema);
import mongoose from 'mongoose';
import Disaster from './Disaster.js';
const userSchema = new mongoose.Schema(
    {
        username:{type:String,required:true,
            unique:true
        },
            role:{
                type:String,
                required:true
            },
             password:{
                type:String,
                required:true
            },
                         email:{
                type:email,
                required:true
            },
                         contact:{
                type:String,
                required:true
            },
            ngo:{
                type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
            },
             assignedDisasters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disaster'
  }],
            timeStamps:true
        }
);
module.exports=mongoose.model("User",userSchema);
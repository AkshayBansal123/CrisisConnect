import User from '../models/User.js';

const getNGOs= async(req,res)=>{
    try{
 ngos= await User.find({role: 'NGO'});
 res.status(200).json(ngos);
    }   

     catch(err)
     {
        console.log(err.message);
     }   
        
}

module.exports = { getNGOS};
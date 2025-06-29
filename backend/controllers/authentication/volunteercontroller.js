import User from '../models/User.js';

const getVolunteers= async(req,res)=>{
    const { role, id } = req.user;
    try{
         let volunteers;
    if (role === 'ngoadmin') {
      volunteers = await User.find({role: 'volunteer'});
      return res.status(200).json(volunteers);
    }
   else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
}
     catch(err)
     {
        console.log(err.message);
     }   
        
}

module.exports = { getVolunteers };
const Disaster = require('../models/disaster');

const createNewDisaster= async(req,res)=>{
    try{
        const newDisaster=new Disaster(req.body);
        await newDisaster.save();
        res.status(201).json(newDisaster);
    }
    catch(err)
    {
        console.log("error in creating the new disaster");
    }
}

const getDisasters= async(req,res)=>{
    const { role, id } = req.user;
    try{
         let disasters;

    if (role === 'ngoadmin') {
      disasters = await Disaster.find();
    } else if (role === 'volunteer') {
      reports = await Disaster.find({ assignedTo: id });
    } else if (role === 'reporter') {
       const reports = await Report.find({ createdBy: id }).select('disaster');
  const disasterIds = reports.map(r => r.disaster);
  disasters = await Disaster.find({ _id: { $in: disasterIds } });
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
        
        res.status(200).json(disasters);
    }
    catch(err)
    {
        console.log("error in getting the reports");
    }
}

module.exports = { createnewDisaster, getDisasters };
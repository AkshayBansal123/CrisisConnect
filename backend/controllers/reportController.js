const Report = require('../models/Report');

const createReport= async(req,res)=>{
    try{
        const newReport=new Report(req.body);
        await newReport.save();
        res.status(201).json(newReport);
    }
    catch(err)
    {
        console.log("error in report");
    }
}

const getReports= async(req,res)=>{
    const { role, id } = req.user;
    try{
         let reports;

    if (role === 'ngoadmin') {
      reports = await Report.find();
    } else if (role === 'volunteer') {
      reports = await Report.find({ assignedTo: id });
    } else if (role === 'reporter') {
      reports = await Report.find({ createdBy: id });
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
        
        res.status(200).json(reports);
    }
    catch(err)
    {
        console.log("error in getting the reports");
    }
}

module.exports = { createReport, getReports };
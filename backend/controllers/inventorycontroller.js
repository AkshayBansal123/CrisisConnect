const Inventory = require('../models/inventory');

const createnewProduct= async(req,res)=>{
    try{
        const newProduct=new Inventory(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch(err)
    {
        console.log("error in report");
    }
}

const getReports= async(req,res)=>{
    const { role, id } = req.user;
    try{
         let products;

    if (role === 'ngoadmin') {
      products= await Inventory.find({provider: id});
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
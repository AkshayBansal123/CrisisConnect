const Inventory= require('../models/inventory');
const createNewProduct= async(req,res)=>{
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

const getInventory= async(req,res)=>{
    const { role, id } = req.user;
    try{
         let products;

    if (role === 'ngoadmin') {
      products= await find({provider: id});
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

export default {createNewProduct,getInventory };
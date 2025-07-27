import mongoose from "mongoose";
import Disaster from "../models/disaster.js";
import Report from "../models/report.js"; // ✅ Required for reporter role

const createNewDisaster = async (req, res) => {
  try {
    const newDisaster = new Disaster(req.body);
    await newDisaster.save();
    res.status(201).json(newDisaster);
  } catch (err) {
    console.error("Error in creating the new disaster:", err.message);
    res.status(500).json({ message: "Failed to create disaster" });
  }
};

const getDisasters = async (req, res) => {
  
  try {
    let disasters;

  
      disasters = await Disaster.find();
 
    

    res.status(200).json(disasters);
  } catch (err) {
    console.error("Error in getting the disasters:", err.message);
    res.status(500).json({ message: "Failed to fetch disasters" });
  }
};

export { createNewDisaster, getDisasters };

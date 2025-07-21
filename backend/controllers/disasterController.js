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
  const { role, id } = req.user;
  try {
    let disasters;

    if (role === 'ngoadmin') {
      disasters = await Disaster.find();
    } else if (role === 'volunteer') {
      disasters = await Disaster.find({ assignedTo: id }); // ✅ Fixed: 'reports' ➝ 'disasters'
    } else if (role === 'reporter') {
      const reports = await Report.find({ createdBy: id }).select('disaster');
      const disasterIds = reports.map(r => r.disaster);
      disasters = await Disaster.find({ _id: { $in: disasterIds } });
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    res.status(200).json(disasters);
  } catch (err) {
    console.error("Error in getting the disasters:", err.message);
    res.status(500).json({ message: "Failed to fetch disasters" });
  }
};

export { createNewDisaster, getDisasters };

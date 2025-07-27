

import Report from '../models/report.js';

export const createReport = async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    console.error("Error in report creation:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getReports = async (req, res) => {
 
  try {
    let reports;

    
      reports = await Report.find();
   

    res.status(200).json(reports);
  } catch (err) {
    console.error("Error in getting the reports:", err);
    res.status(500).json({ message: "Internal Servr" });
  }
};



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
  const { role, id } = req.user;
  try {
    let reports;

    if (role === 'ngoadmin') {
      reports = await Report.find();
    } else if (role === 'reporter') {
      reports = await Report.find({ createdBy: id });
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    res.status(200).json(reports);
  } catch (err) {
    console.error("Error in getting the reports:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

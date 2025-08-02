import User from '../models/User.js';

const getVolunteers = async (req, res) => {
 

  try {
    
      const volunteers = await User.find({ role: 'volunteer' });
      res.status(200).json(volunteers);
    
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    res.status(500).json({ message: "Server error" });
  }
};

export { getVolunteers };

import User from '../models/User.js';

const getVolunteers = async (req, res) => {
  const { role } = req.user;

  try {
    if (role === 'ngoadmin') {
      const volunteers = await User.find({ role: 'volunteer' });
      return res.status(200).json(volunteers);
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    res.status(500).json({ message: "Server error" });
  }
};

export { getVolunteers };

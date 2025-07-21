import User from '../models/User.js';

export const getNGOs = async (req, res) => {
  try {
    const ngos = await User.find({ role: 'NGO' });
    res.status(200).json(ngos);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

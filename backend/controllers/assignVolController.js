import Disaster from '../models/disaster.js';
import User from '../models/User.js';

const assignVolunteers = async (req, res) => {
  const { disasterId, volunteerIds } = req.body;
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Only NGO admins can assign volunteers' });
  }

  try {
    const disaster = await Disaster.findById(disasterId);

    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }

    // Add new volunteers only
    volunteerIds.forEach(id => {
      if (!disaster.assignedVol.includes(id)) {
        disaster.assignedVol.push(id);
      }
    });

    await disaster.save();

    await User.updateMany(
      { _id: { $in: volunteerIds } },
      { $addToSet: { assignedDisasters: disasterId } }
    );

    res.status(200).json({ message: 'Volunteers successfully assigned' });
  } catch (err) {
    console.error('Error assigning volunteers:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export { assignVolunteers };

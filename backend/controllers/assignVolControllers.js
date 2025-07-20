const Disaster = require('../models/disaster');
const User = require('../models/User');
 
  
  const assignVolunteers= async (req, res) => {
     const { disasterId ,volunteerIds} = req.body;
  const { role } = req.user;
  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Only NGO admins can assign volunteers' });
  }

   try {
    const disaster = await Disaster.findById(disasterId);
    

    if (!disaster) {
      return res.status(404).json({ message: 'Disaster or Volunteer not found' });
    }

 volunteerIds.forEach((id) => {
      if (!disaster.assignedVol.includes(id)) {
        disaster.assignedVol.push(id);
      }
    });

    await disaster.save();

    await User.updateMany(
      {_id :{$in: volunteerIds}},
      {
        $addToSet: { assignedDisasters: disasterId }
      }
    )
    res.status(200).json({ message: 'Volunteer successfully assigned' });
  } catch (err) {
    console.error('Error assigning volunteer:', err);
    res.status(500).json({ message: 'Server error' });
  }

}
module.exports = {
  assignVolunteers
};



const Disaster = require('../models/disaster');
const Inventory = require('../models/inventory');
  const { disasterId ,itemIds} = req.body;
  const { role } = req.user;
  
  const assignVolunteers= async (req, res) => {
  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Only NGO admins can assign volunteers' });
  }

   try {
    const disaster = await Disaster.findById(disasterId);
   

    if (!disaster ) {
      return res.status(404).json({ message: 'Disaster or Volunteer not found' });
    }

 itemIds.forEach((id) => {
      if (!disaster.assignedItems.includes(id)) {
        disaster.assignedItems.push(id);
      }
    });

    await disaster.save();


    await Inventory.updateMany(
  { _id: { $in: itemIds } },
  { $set: { assignedDisaster: disasterId } }
);

    res.status(200).json({ message: 'Volunteer successfully assigned' });
  } catch (err) {
    console.error('Error assigning volunteer:', err);
    res.status(500).json({ message: 'Server error' });
  }

}
module.exports = {
  assignVolunteers
};
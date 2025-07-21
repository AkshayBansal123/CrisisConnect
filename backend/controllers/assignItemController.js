import Inventory from '../models/inventory.js';
import User from '../models/User.js';
import Disaster from '../models/disaster.js';

const assignItems = async (req, res) => {
  const { disasterId, itemIds } = req.body;
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Only NGO admins can assign volunteers' });
  }

  try {
    const disaster = await Disaster.findById(disasterId);

    if (!disaster) {
      return res.status(404).json({ message: 'Disaster not found' });
    }

    // Assign items
    itemIds.forEach((id) => {
      if (!disaster.assignedItems.includes(id)) {
        disaster.assignedItems.push(id);
      }
    });


    // Update users
    await Inventory.updateMany(
      { _id: { $in:  itemIds} },
      { assignedDisaster: disasterId }
    );

    res.status(200).json({ message: 'Volunteers and items successfully assigned' });
  } catch (err) {
    console.error('Error assigning volunteers/items:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { assignItems };

import Inventory from '../models/inventory.js';
import User from '../models/User.js';
import Disaster from '../models/disaster.js';

const assignItems = async (req, res) => {
  const { disasterId, itemIds } = req.body;
 

 
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
 await disaster.save();

    // Update users
    await Inventory.updateMany(
      { _id: { $in:  itemIds} },
      { assignedDisaster: disasterId }
    );

    res.status(200).json({ message: 'items successfully assigned' });
  } catch (err) {
    console.error('Error assigning items:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { assignItems };

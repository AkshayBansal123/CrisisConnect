import mongoose from 'mongoose';

const disasterSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  location: { type: String, required: true },
  description: { type: String },
 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   assignedVol:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],
  assignedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
   status: { type: String, enum: ['New','Active' ,'Resolved'], default: 'New' }},
   {timestamps:true}
);

const Disaster = mongoose.models.Disaster ||mongoose.model('Disaster', disasterSchema);
export default Disaster;
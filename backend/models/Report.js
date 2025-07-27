import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reporterName: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  disasterType: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  disaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }
}, {
  timestamps: true
});

const Report = mongoose.models.Report ||mongoose.model('Report', reportSchema);
export default Report;

const mongoose=require('mongoose');
const reportSchema=new mongoose.Schema({
    reporterName:{type:String,required:true},
    contact:{type:String,required:true},
    location:{type:String,required:true},
    disasterType:{type:String,required:true},
    description:{type:String,required:true},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  disaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }
}, 
  {timestamps:true
});

module.exports=mongoose.model('Reports',reportSchema);
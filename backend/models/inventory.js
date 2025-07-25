import mongoose from 'mongoose';
import Disaster from './disaster.js';
const inventorySchema= new mongoose.Schema(
    {
        itemName:{type:String,required:true},
        provider:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            default: null
          },
        location:{type:String,required:true},
        quantity:{type:Number,required:true},
        unit:{type:String,required:true},
        description:{type:String,required:true},
        status:{type:String,enum:['Available', 'Assigned', 'Out of Stock'], default:'Available'},
        assignedDisaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }
    },
        {timeStamps:true
    }
)
const Inventory=mongoose.models.Inventory ||mongoose.model('Inventory',inventorySchema);
export default Inventory;
const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const reportRoutes=require('./routes/reportRoutes');
const disasterRoutes=require('./routes/disasterRoutes');
const inventoryRoutes=require('./routes/inventoryRoutes');
const vounteerRoutes=require('./routes/volunteerRoutes');
const ngoRoutes=require('./routes/NGORoutes');
const assignVolunteers=require('./routes/assignVolRoutes');
const assignItems=require('./routes/assignItemsRoutes');
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/reports',reportRoutes);
app.use('/api/disasters',disasterRoutes);
app.use('/api/admin/inventory',inventoryRoutes);
app.use('/api/volunteers',vounteerRoutes);
app.use('api/ngos',ngoRoutes);
app.use('/api/disasters/assignVols',assignVolunteers);
app.use('/api/disasters/assignItems',assignItems);
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(
    ()=>{
        console.log("connected to database");
    }
).catch(
    (err)=>{
        console.log("error connecting to database",err);
    }
)

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


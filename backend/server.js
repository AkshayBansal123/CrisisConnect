
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import reportRoutes from './routes/reportRoutes.js';
import disasterRoutes from './routes/disasterRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import NGORoutes from './routes/NGORoutes.js';
import assignVolunteers from './routes/assignVolRoutes.js';
import assignItems from './routes/assignItemsRoutes.js';
import authRoutes from './routes/authRoutes.js';
const app = express();

// Load environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api',authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/disasters', disasterRoutes);
app.use('/api/ngo/inventory', inventoryRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/ngos', NGORoutes); 
app.use('/api/ngo/assignVols', assignVolunteers);
app.use('/api/ngo/assignItems', assignItems);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.error("Error connecting to database:", err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
``


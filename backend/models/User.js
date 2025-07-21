import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    assignedDisasters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disaster'
      }
    ]
  },
  {
    timestamps: true // Corrected spelling (was "timeStamps")
  }
);

const User = mongoose.models.User ||mongoose.model('User', userSchema);
export default User;

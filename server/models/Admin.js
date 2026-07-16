import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      maxlength: [60, 'Admin name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      required: [true, 'Admin password is required'],
      minlength: [8, 'Admin password must be at least 8 characters long']
    }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;

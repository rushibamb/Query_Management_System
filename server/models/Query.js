import mongoose from 'mongoose';

const querySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Customer name cannot exceed 100 characters']
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please provide a valid email address'
      }
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [150, 'Subject cannot exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ['Technical', 'Billing', 'Account', 'General'],
        message: '{VALUE} is not a valid category'
      },
      default: 'General'
    },
    priority: {
      type: String,
      required: true,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a valid priority'
      },
      default: 'Medium'
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['Open', 'In Progress', 'Resolved'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Open'
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: false
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: false
    }
  },
  {
    timestamps: true
  }
);

// Indexes to speed up common searches, sorting, and filter tasks
querySchema.index({ customerEmail: 1 });
querySchema.index({ customerName: 1 });
querySchema.index({ status: 1 });
querySchema.index({ priority: 1 });
querySchema.index({ category: 1 });
querySchema.index({ createdBy: 1 });

const Query = mongoose.model('Query', querySchema);

export default Query;

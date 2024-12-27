import { Schema, model, models, Types } from 'mongoose';

const NotificationSchema = new Schema({  
  recipient: {
    type: Types.ObjectId,  
    ref: 'User',
    required: true
  },
  taskId: {
    type: Types.ObjectId,  
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = models.Notification || model('Notification', NotificationSchema);  

export default Notification;